import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter,
  Routes,
  Route,
  json,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast, Toaster } from "react-hot-toast";
import DashLayout from "./dashboard/components/DashLayout";
import InformationPage from "./dashboard/pages/homepages/InformationPage";
import UnitSettings from "./dashboard/pages/homepages/UnitSettings";
import Reservations from "./dashboard/pages/reservations/Reservations";
import Calender from "./dashboard/pages/Calender/Calender";
import HomePage from "./website/pages/Home/HomePage";
import Details from "./website/pages/Details/Details";
import RealEstates from "./dashboard/pages/RealEstates/RealEstates";
import Addads from "./dashboard/pages/add_ads_folder/Addads";
import Layout from "./website/Layouts/Layout";
import Payment from "./website/pages/payment/Payment";
import MainPrices from "./dashboard/pages/prices/MainPrices";
import Offers from "./dashboard/pages/prices/Offers";
import DownPrice from "./dashboard/pages/prices/DownPrice";
import Bills from "./dashboard/pages/Bills/Bills";
import Contracts from "./dashboard/pages/Contracts/Contracts";
import Finance from "./dashboard/pages/Finance/Finance";
import Map from "./website/pages/map/Map";
import Requests from "./dashboard/pages/Requests/Requests";
import ContractDetails from "./dashboard/pages/Contracts/ContractDetails/ContractDetails";
import CreateContract from "./website/pages/CreateContract/CreateContract";
import InstantPayment from "./dashboard/pages/Instant_payment/InstantPayment";
import MyInfo from "./dashboard/pages/my_info/MyInfo";
import FinancialTransactions from "./dashboard/pages/financial_transactions/FinancialTransactions";
import AccountStatements from "./dashboard/pages/account_statements/AccountStatements";
import PaymentReceiption from "./dashboard/pages/paymentReceiption/PaymentReceiption";
import BillingStatements from "./dashboard/pages/BillingStatements/BillingStatements";
import ContactUs from "../src/website/pages/contact_us/ContactUs";
import AboutUs from "./website/pages/about_us/AboutUs";
import AddUnit from "./dashboard/pages/add_unit/AddUnit";
import ElectronicInvoices from "./dashboard/pages/Electronic_invoices/ElectronicInvoices";
import CreateTypeContract from "./dashboard/pages/create_type_contract/CreateTypeContract";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myAxios from "./api/myAxios";
import BussinesMainPage from "./website/pages/Busseins_main_page/BussinesMainPage";
import Unit from "./dashboard/pages/unit/Unit";
import Coupons from "./dashboard/pages/coupons/Coupons";
import TermOfService from "./website/pages/term-of-service/TermOfService";
import AllDeals from "./website/pages/all_deals/AllDeals";
import PaymentDone from "./website/pages/done_payment/PaymentDone";
import Notification from "./dashboard/pages/Notification/Notification";
import TermsOfUse from "./website/pages/terms of use/TermsOfUse";
import { CalendarProvider } from "./dashboard/context/calendarContext";

const PrivateRoute = ({ element }) => {
  const thereisToken = localStorage.getItem("user_token");
  return thereisToken ? element : <Navigate to="/" />;
};

function App() {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const settingData = JSON.parse(localStorage.getItem("settingData"));
  useEffect(() => {
    const searchData = localStorage.getItem("searchData");
    const getData = async () => {
      const res = await myAxios.get("api/v1/user/settings/search_data");
      console.log(res);
      if (res?.data?.status === true) {
        localStorage.setItem("searchData", JSON.stringify(res?.data?.data));
      }
    };
    if (!searchData) {
      getData();
    }

    const getSettingData = async () => {
      const res2 = await myAxios.get("api/v1/user/settings/general");
      console.log(res2);
      if (res2?.data?.status === true) {
        localStorage.setItem("settingData", JSON.stringify(res2?.data?.data));
      }
    };
    if (!settingData) {
      getSettingData();
    } else {
      document.title =
        language === "en"
          ? settingData.site_title_en
          : settingData.site_title_ar;
    }
  }, [language]);

  useEffect(() => {
    const searchData = localStorage.getItem("searchData");
    const getData = async () => {
      const res = await myAxios.get("api/v1/user/settings/search_data");
      console.log(res);
      if (res.data.status === true) {
        localStorage.setItem("searchData", JSON.stringify(res.data.data));
      }
    };
    if (!searchData) {
      getData();
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "direction",
      language === "ar" ? "rtl" : "ltr"
    );
    document.documentElement.lang = language;

    document.documentElement.style.setProperty(
      "text-align",
      language === "ar" ? "right" : "left"
    );
  }, [language]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Helmet>
        <meta
          name="description"
          content={
            language === "ar"
              ? settingData?.site_desc_ar
              : settingData?.site_desc_en
          }
        />
        <meta
          name="keywords"
          content={
            language === "ar"
              ? settingData?.site_keywords_ar
              : settingData?.site_keywords_en
          }
        />
      </Helmet>
      <Routes>
        <Route
          index
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/details/:id"
          element={
            <Layout>
              <Details />
            </Layout>
          }
        />
        <Route
          path="/all_deals"
          element={
            <Layout>
              <AllDeals />
            </Layout>
          }
        />
        <Route
          path="/features"
          element={
            <Layout>
              <AllDeals />
            </Layout>
          }
        />
        <Route
          path="payment"
          element={
            <Layout>
              <Payment />
            </Layout>
          }
        />
        <Route
          path="/payment_done"
          element={
            <Layout>
              <PaymentDone />
            </Layout>
          }
        />
        <Route
          path="map"
          element={
            <Layout>
              <Map />
            </Layout>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/about-us"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/terms_of_use"
          element={
            <Layout>
              <TermsOfUse />
            </Layout>
          }
        />
        <Route
          path="business"
          element={
            <Layout>
              <BussinesMainPage />
            </Layout>
          }
        />

        <Route
          path="term-of-service-agreement"
          element={
            <Layout>
              <TermOfService />
            </Layout>
          }
        />

        {/* <Route
          path="dashboard"
          element={<PrivateRoute element={<DashLayout />} />}
        > */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute
              element={
                <CalendarProvider>
                  <DashLayout />
                </CalendarProvider>
              }
            />
          }
        >
          <Route path="home">
            <Route index element={<InformationPage />} />
            <Route path="unit-settings" element={<UnitSettings />} />
          </Route>
          <Route path="my_info" element={<MyInfo />} />
          <Route path="calendar" element={<Calender />} />

          <Route path="reservations" element={<Reservations />} />
          <Route path="properties" element={<RealEstates />} />
          <Route path="properties/:id" element={<Unit />} />
          <Route path="transactions" element={<FinancialTransactions />} />
          <Route path="billing_statements" element={<BillingStatements />} />
          <Route path="statements" element={<AccountStatements />} />
          <Route path="paymentReceiption" element={<PaymentReceiption />} />
          <Route path="electronic_invoices" element={<ElectronicInvoices />} />
          <Route path="notifications" element={<Notification />} />

          <Route path="acc">
            <Route index path="requests" element={<Requests />} />
            <Route path="contracts" element={<Contracts />} />
            <Route path="contact_details" element={<ContractDetails />} />
            <Route path="create_contract" element={<CreateContract />} />
            <Route path="finance" element={<Finance />} />
            <Route path="InstantPayment" element={<InstantPayment />} />
            <Route
              path="create_type_contract"
              element={<CreateTypeContract />}
            />
          </Route>
          <Route path="prices">
            <Route path="main" element={<MainPrices />} />
            <Route path="offers" element={<Offers />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="down-prices" element={<DownPrice />} />
          </Route>
        </Route>

        <Route
          path="addoffice"
          element={<PrivateRoute element={<Addads />} />}
        />
        <Route
          path="addunit"
          element={<PrivateRoute element={<AddUnit />} />}
        />
      </Routes>
    </>
  );
}

export default App;
