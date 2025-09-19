import HeaderNavigation from "@/components/sections/header-navigation";
import ApiMainContent from "@/components/sections/api-main-content";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNavigation />
      <div className="pt-[56px]">
        <ApiMainContent />
        <Footer />
      </div>
    </div>
  );
}