"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const INITIAL_FORM = {
  fullName: "",
  dob: "",
  phoneNumber: "",
  email: "",
  address: "",
};

export function useSignup() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [gender, setGender] = useState("male");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileFileName, setProfileFileName] = useState("");
  const [profilePreviewUrl, setProfilePreviewUrl] = useState("");
  const [form, setForm] = useState(INITIAL_FORM);

  function handleBack() {
    router.push("/login");
  }

  function handleGenderChange(nextGender) {
    setGender(nextGender);
  }

  function handleFieldChange(field) {
    return function onFieldChange(event) {
      const value = event.target.value;
      if (field === "phoneNumber") {
        setForm((prev) => ({ ...prev, [field]: value.replace(/\D/g, "").slice(0, 10) }));
        return;
      }
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  function handleOpenProfilePicker() {
    fileInputRef.current?.click();
  }

  function handleProfileFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      setProfileFileName("");
      setProfilePreviewUrl("");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setProfileFileName(file.name);
    setProfilePreviewUrl(previewUrl);
  }

  useEffect(() => {
    return () => {
      if (profilePreviewUrl) {
        URL.revokeObjectURL(profilePreviewUrl);
      }
    };
  }, [profilePreviewUrl]);

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim().length > 1 &&
      form.dob.trim().length > 0 &&
      form.phoneNumber.length === 10 &&
      form.email.trim().length > 3 &&
      form.address.trim().length > 3
    );
  }, [form]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Placeholder for signup API call.
      await new Promise((resolve) => setTimeout(resolve, 300));
      router.push("/choose-language");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    gender,
    isSubmitting,
    canSubmit,
    fileInputRef,
    profileFileName,
    profilePreviewUrl,
    handleBack,
    handleGenderChange,
    handleFieldChange,
    handleOpenProfilePicker,
    handleProfileFileChange,
    handleSubmit,
  };
}
