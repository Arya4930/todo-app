import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
