"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardProfile } from "@/redux/slices/dashboardSlice";
import { getAPIAuth, patchAPIAuth } from "@/lib/apiServices";
import { API_ENDPOINTS } from "@/constants/apiConstants";
import { getBackendImageUrl } from "@/lib/getBackendImageUrl";
import { uploadToS3 } from "@/lib/uploadToS3";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.dashboard.profile);
  const profileData = profileState.data;

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [languagesList, setLanguagesList] = useState([]);
  const [expertisesList, setExpertisesList] = useState([]);

  const fileInputRef = useRef(null);
  const certInputRef = useRef(null);

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await getAPIAuth(API_ENDPOINTS.GET_LISTING);
        if (res?.data?.status) {
          setLanguagesList(res.data.data.languages || []);
          setExpertisesList(res.data.data.expertises || []);
        }
      } catch (err) {
        console.error("Failed to fetch listing:", err);
      }
    }
    fetchListing();
  }, []);

  // Format date from dd/mm/yyyy to yyyy-mm-dd for the date picker if needed, but let's assume it's string.
  const parseDate = (dob) => {
    if (!dob) return "";
    if (dob.includes("/")) {
      const parts = dob.split("/");
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }
    return dob;
  };

  const getInitialValues = () => {
    if (!profileData) return {
      name: "", dob: "", email: "", gender: "", cityState: "", experience: "",
      languages: [], expertises: [], consultationType: [],
      ratePerMinChat: "", ratePerMinCall: "", ratePerMinVideoCall: "",
      chartType: "North Indian", achievements: "", about: "", image: "", certificate: ""
    };

    let consultationType = profileData.consultationType || [];
    if (typeof consultationType[0] === 'string' && consultationType[0].startsWith('[')) {
        try {
            const parsed = JSON.parse(consultationType[0]);
            consultationType = Array.from(new Set([...consultationType.slice(1), ...parsed]));
        } catch(e){}
    }

    return {
      name: profileData.name || "",
      dob: parseDate(profileData.dob) || "",
      email: profileData.email || "",
      gender: profileData.gender || "",
      cityState: profileData.cityState || "",
      experience: profileData.experience || "",
      languages: profileData.languages || [],
      expertises: profileData.expertises || [],
      consultationType: Array.isArray(consultationType) ? consultationType : [],
      ratePerMinChat: profileData.ratePerMinChat || "",
      ratePerMinCall: profileData.ratePerMinCall || "",
      ratePerMinVideoCall: profileData.ratePerMinVideoCall || "",
      chartType: profileData.chartType || "North Indian",
      achievements: profileData.achievements || "",
      about: profileData.about || "",
      image: profileData.image || "",
      certificate: profileData.certificate || ""
    };
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    dob: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future")
      .required("Date of birth is required"),
    email: Yup.string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email format")
      .required("Email is required"),
    ratePerMinChat: Yup.number()
      .typeError("Must be a number")
      .min(1, "Must be greater than 0"),
    ratePerMinCall: Yup.number()
      .typeError("Must be a number")
      .min(1, "Must be greater than 0"),
    ratePerMinVideoCall: Yup.number()
      .typeError("Must be a number")
      .min(1, "Must be greater than 0"),
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // Format date back to dd/mm/yyyy if that's what backend expects
        const payload = { ...values };
        if (payload.dob && payload.dob.includes("-")) {
          const parts = payload.dob.split("-");
          if (parts.length === 3) {
            payload.dob = `${parts[2]}/${parts[1]}/${parts[0]}`;
          }
        }

        const res = await patchAPIAuth(API_ENDPOINTS.UPDATE_ASTROLOGER_DETAIL, payload);
        if (res?.data?.status) {
          toast.success(res.data.message || "Profile updated");
          setIsEditing(false);
          dispatch(fetchDashboardProfile());
        } else {
          toast.error(res?.data?.message || "Update failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while saving");
      } finally {
        setLoading(false);
      }
    }
  });

  const { values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit } = formik;

  const toggleArrayItem = (arrayName, value) => {
    if (!isEditing) return;
    const arr = values[arrayName] || [];
    if (arr.includes(value)) {
      setFieldValue(arrayName, arr.filter(item => item !== value));
    } else {
      setFieldValue(arrayName, [...arr, value]);
    }
  };

  const handleImageUpload = async (e, fieldName) => {
    if (!isEditing) return;
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.loading("Uploading...");
      const key = await uploadToS3(file);
      toast.dismiss();
      toast.success("Uploaded successfully");
      setFieldValue(fieldName, key);
    } catch (err) {
      toast.dismiss();
      toast.error("Upload failed");
    }
  };

  if (!profileData) {
    return (
        <div className="flex flex-1 items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    );
  }

  // Calculate today's date string for HTML5 date input max attribute
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col gap-6 mx-auto w-full  bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              setIsEditing(false);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="relative group cursor-pointer" onClick={() => isEditing && fileInputRef.current?.click()}>
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-primary/20 bg-primary-light relative">
              {values.image ? (
                <img src={getBackendImageUrl(values.image)} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'image')} />
          <h2 className="text-lg font-semibold text-gray-800">{profileData.name}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!isEditing}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50 read-only:bg-gray-50 read-only:text-gray-500 ${errors.name && touched.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && touched.name && <span className="text-xs text-red-500">{errors.name}</span>}
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type={isEditing ? "date" : "text"}
              name="dob"
              max={todayStr}
              value={values.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!isEditing}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50 read-only:bg-gray-50 read-only:text-gray-500 ${errors.dob && touched.dob ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.dob && touched.dob && <span className="text-xs text-red-500">{errors.dob}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="mobile"
              value={profileData.mobile || ""}
              readOnly
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!isEditing}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50 read-only:bg-gray-50 read-only:text-gray-500 ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && touched.email && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <div className="flex gap-2">
              {['male', 'female', 'other'].map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => isEditing && setFieldValue('gender', g)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium capitalize transition-colors ${
                    values.gender === g 
                    ? "bg-primary text-white border-primary" 
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  } ${!isEditing && values.gender !== g ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="cityState"
              value={values.cityState}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!isEditing}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 read-only:bg-gray-50 read-only:text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Experience</label>
            <select
              name="experience"
              value={values.experience}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!isEditing}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-50 disabled:text-gray-500 bg-white"
            >
              <option value="">Select Experience</option>
              <option value="0-2 years">0-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-100 my-2"></div>

        {/* Languages & Expertise */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Language Known</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {languagesList.map(lang => {
                const isSelected = values.languages.includes(lang.title);
                return (
                  <button
                    key={lang._id}
                    type="button"
                    onClick={() => toggleArrayItem('languages', lang.title)}
                    className={`px-4 py-1.5 rounded-lg border text-sm transition-colors flex items-center gap-1 ${
                      isSelected ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                    } ${!isEditing && !isSelected ? "hidden" : ""}`}
                  >
                    {isSelected && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    {lang.title}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Expertise</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {expertisesList.map(exp => {
                const isSelected = values.expertises.includes(exp.name);
                return (
                  <button
                    key={exp._id}
                    type="button"
                    onClick={() => toggleArrayItem('expertises', exp.name)}
                    className={`px-4 py-1.5 rounded-lg border text-sm transition-colors flex items-center gap-1 ${
                      isSelected ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                    } ${!isEditing && !isSelected ? "hidden" : ""}`}
                  >
                    {isSelected && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    {exp.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Consultation Type</label>
            <div className="flex flex-wrap gap-2">
              {['chat', 'call', 'video call', 'voiceCall', 'videoCall'].map(type => {
                const displayMap = { chat: 'Chat', call: 'Voice Call', 'video call': 'Video Call', voiceCall: 'Voice Call', videoCall: 'Video Call' };
                
                const baseName = displayMap[type];
                
                if (type === 'call' && values.consultationType.includes('voiceCall')) return null;
                if (type === 'video call' && values.consultationType.includes('videoCall')) return null;

                const isSelected = values.consultationType.includes(type);
                
                if (!isEditing && !isSelected) return null;
                
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleArrayItem('consultationType', type)}
                    className={`px-4 py-1.5 rounded-lg border text-sm transition-colors flex items-center gap-1 ${
                      isSelected ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {isSelected && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    {baseName}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Charges (Chat)</label>
            <input
              type="number"
              name="ratePerMinChat"
              value={values.ratePerMinChat}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!isEditing}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50 read-only:bg-gray-50 read-only:text-gray-500 ${errors.ratePerMinChat && touched.ratePerMinChat ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.ratePerMinChat && touched.ratePerMinChat && <span className="text-xs text-red-500">{errors.ratePerMinChat}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Charges (Voice Call)</label>
            <input
              type="number"
              name="ratePerMinCall"
              value={values.ratePerMinCall}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!isEditing}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50 read-only:bg-gray-50 read-only:text-gray-500 ${errors.ratePerMinCall && touched.ratePerMinCall ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.ratePerMinCall && touched.ratePerMinCall && <span className="text-xs text-red-500">{errors.ratePerMinCall}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Charges (Video Call)</label>
            <input
              type="number"
              name="ratePerMinVideoCall"
              value={values.ratePerMinVideoCall}
              onChange={handleChange}
              onBlur={handleBlur}
              readOnly={!isEditing}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50 read-only:bg-gray-50 read-only:text-gray-500 ${errors.ratePerMinVideoCall && touched.ratePerMinVideoCall ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.ratePerMinVideoCall && touched.ratePerMinVideoCall && <span className="text-xs text-red-500">{errors.ratePerMinVideoCall}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Chart Type</label>
            <select
              name="chartType"
              value={values.chartType}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!isEditing}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-50 disabled:text-gray-500 bg-white"
            >
              <option value="">Select Chart Type</option>
              <option value="North Indian">North Indian</option>
              <option value="South Indian">South Indian</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Certification Upload(Optional)</label>
          <div 
            onClick={() => isEditing && certInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 ${
              isEditing ? "border-gray-300 hover:border-primary/50 cursor-pointer bg-gray-50/50" : "border-gray-200 bg-gray-50"
            }`}
          >
            {values.certificate ? (
               <div className="text-sm text-gray-700 flex items-center gap-2">
                 <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 Certificate Uploaded
               </div>
            ) : (
               <div className="text-sm text-gray-500 flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                 Click to upload your certification
               </div>
            )}
          </div>
          <input type="file" ref={certInputRef} className="hidden" accept="image/*,.pdf" onChange={(e) => handleImageUpload(e, 'certificate')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Achievements</label>
            <div className="relative">
              <textarea
                name="achievements"
                value={values.achievements}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly={!isEditing}
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 read-only:bg-gray-50 read-only:text-gray-500 resize-none"
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {(values.achievements || "").length}/500
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">About Me</label>
            <div className="relative">
              <textarea
                name="about"
                value={values.about}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly={!isEditing}
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 read-only:bg-gray-50 read-only:text-gray-500 resize-none"
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {(values.about || "").length}/500
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#e86a45] text-white rounded-xl font-semibold hover:bg-[#d65f3d] transition-colors disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

