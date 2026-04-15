export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen">
        <video src="background-video.mp4" autoPlay loop muted className="absolute w-full h-full object-cover">

        </video>
      {children}
    </div>
  );
}