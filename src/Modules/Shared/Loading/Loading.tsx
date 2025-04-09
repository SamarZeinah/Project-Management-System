import { BeatLoader } from "react-spinners";
import logo from '../../../assets/nav-logo.png'
export default function Loading() {
  return <>
    <div className="text-center d-flex flex-column justify-content-center align-items-center mt-3">
  <img src={logo} alt="logo" className="mb-3" />
  <BeatLoader color=" rgba(239, 155, 40, 1)" size={18} />
</div></>;
}
