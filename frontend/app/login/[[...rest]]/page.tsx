import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 font-sans">
      <SignIn 
        path="/login"
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm font-bold rounded-xl",
            card: "bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 rounded-2xl",
            headerTitle: "text-gray-900 dark:text-white font-extrabold",
            headerSubtitle: "text-gray-600 dark:text-gray-400",
            socialButtonsBlockButton: "rounded-xl border-gray-200 dark:border-gray-800",
            formFieldInput: "rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700",
            footerActionLink: "text-blue-600 hover:text-blue-500 font-bold",
          }
        }}
      />
    </div>
  );
}
