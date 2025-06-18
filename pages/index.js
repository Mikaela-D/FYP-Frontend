import { useEffect } from "react";
import { useRouter } from "next/router";

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <h1>Welcome to the the Call Centre CRM platform</h1>
      <p>Please select an option from the navigation menu to get started.</p>
    </div>
  );
}

export default HomePage;
