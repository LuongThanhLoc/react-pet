import GiveCats from "../layouts/GiveCats/GiveCats";
import GiveDogs from "../layouts/GIveDogs/GiveDogs";
import HomePage from "../layouts/HomePage/HomePage";
import InfoCatsAndDogs from "../layouts/InfoCats&Dogs/InfoCats&Dogs";
import ReceiveCats from "../layouts/ReceiveCats/ReceiveCats";
import ReceiveDogs from "../layouts/ReceiveDogs/ReceiveDogs";
import ReceiveDogsDetails from "../layouts/ReceiveDogsDetails/ReceiveDogsDetails";
import SignIn from "../layouts/SignIn/SignIn";
import SignUp from "../layouts/SIgnUp/SignUp";

const logo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const publicRoute = [
  { id: 0, name: "Trang chủ", path: "/", element: HomePage, logo: logo },
  {
    id: 1,
    name: "Nhận nuôi mèo",
    path: "/receive-cats",
    element: ReceiveCats,
    logo: null,
  },
  {
    id: 2,
    name: "Nhận nuôi chó",
    path: "/receive-dogs",
    element: ReceiveDogs,
    logo: null,
  },
  {
    id: "slug-receive-dogs",
    name: null,
    path: "/receive-dogs/:slug",
    element: ReceiveDogsDetails,
    logo: null,
  },
  {
    id: 3,
    name: "Tôi muốn cho chó",
    path: "/give-dog",
    element: GiveDogs,
    logo: null,
  },
  {
    id: 4,
    name: "Tôi muốn cho mèo",
    path: "/give-cat",
    element: GiveCats,
    logo: null,
  },
  {
    id: 5,
    name: "Một số  thông tin về chó mèo",
    path: "/info-cats-dogs",
    element: InfoCatsAndDogs,
    logo: null,
  },
  { id: 7, name: null, path: "/sign-up", element: SignUp, logo: null },
  { id: 6, name: null, path: "/sign-in", element: SignIn, logo: null },
];

const privateRoute = [];

export { publicRoute, privateRoute };
