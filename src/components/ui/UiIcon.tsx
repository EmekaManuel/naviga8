import React from "react";
// These icons should be arranged alphabetically for easy sorting
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CaretDown,
  CaretUp,
  Chats,
  CreditCard,
  Check,
  Checks,
  DotsThree,
  DotsThreeVertical,
  Eye,
  EyeSlash,
  FolderNotchOpen,
  House,
  Kanban,
  MapPin,
  Money,
  PaperPlaneTilt,
  PencilSimple,
  ShieldCheck,
  SignOut,
  Suitcase,
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
  Star,
  Truck,
  User,
  UsersThree,
  X,
} from "phosphor-react";
// These icons should be arranged alphabetically for easy sorting
const icons = {
  LinkedinLogo: <LinkedinLogo />,
  TwitterLogo: <TwitterLogo />,
  InstagramLogo: <InstagramLogo />,
  YoutubeLogo: <YoutubeLogo />,
  FacebookLogo: <FacebookLogo />,
  ArrowLeft: <ArrowLeft />,
  ArrowRight: <ArrowRight />,
  ArrowUpRight: <ArrowUpRight />,
  CaretDown: <CaretDown />,
  CaretUp: <CaretUp />,
  Chats: <Chats />,
  CreditCard: <CreditCard />,
  Check: <Check />,
  Checks: <Checks />,
  DotsThree: <DotsThree />,
  DotsThreeVertical: <DotsThreeVertical />,
  Eye: <Eye />,
  EyeSlash: <EyeSlash />,
  FolderNotchOpen: <FolderNotchOpen />,
  House: <House />,
  Kanban: <Kanban />,
  MapPin: <MapPin />,
  Money: <Money />,
  PaperPlaneTilt: <PaperPlaneTilt />,
  PencilSimple: <PencilSimple />,
  ShieldCheck: <ShieldCheck />,
  SignOut: <SignOut />,
  Suitcase: <Suitcase />,
  Star: <Star />,
  Truck: <Truck />,
  User: <User />,
  UsersThree: <UsersThree />,
  X: <X />,
};

export type Icons = keyof typeof icons;
interface Props {
  /** Name of the icon as stored in the icons object */
  icon: Icons;
  size?: string;
}
export default function UiIcon({ icon, size = "16" }: Props) {
  return <div style={{ fontSize: size + "px" }}>{icons[icon]}</div>;
}
