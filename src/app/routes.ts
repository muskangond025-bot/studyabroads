import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import EventTypes from "./pages/EventTypes";
import IndividualEvent from "./pages/IndividualEvent";
import Venues from "./pages/Venues";
import ContactUs from "./pages/ContactUs";
import GetQuote from "./pages/GetQuote";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/about",
        Component: AboutUs,
    },
    {
        path: "/services",
        Component: Services,
    },
    {
        path: "/events",
        Component: EventTypes,
    },
    {
        path: "/events/:eventId",
        Component: IndividualEvent,
    },
    {
        path: "/venues",
        Component: Venues,
    },
    {
        path: "/contact",
        Component: ContactUs,
    },
    {
        path: "/get-quote",
        Component: GetQuote,
    },
    {
        path: "/privacy-policy",
        Component: PrivacyPolicy,
    },
    {
        path: "/terms-of-service",
        Component: TermsOfService,
    },
    {
        path: "/refund-policy",
        Component: RefundPolicy,
    },
], {
    basename: "/studyabroads",
});