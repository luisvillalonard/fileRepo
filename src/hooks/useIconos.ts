import { EditOutlined, MenuOutlined, LoadingOutlined, PoweroffOutlined, LockOutlined, BellOutlined } from "@ant-design/icons";
import { IconType } from "react-icons"
import { AiOutlineUser } from "react-icons/ai"
import { BsSearch, BsTrash, BsUpload } from "react-icons/bs"
import { BsPlusLg } from "react-icons/bs"
import { GoChecklist, GoMail, GoTasklist } from "react-icons/go"
import { HiOutlineBuildingOffice2, HiOutlineUsers } from "react-icons/hi2"
import { LiaSearchPlusSolid } from "react-icons/lia"
import { LuFileText } from "react-icons/lu"

export function useIconos() {

    const IconAlert = BellOutlined;
    const IconChecklist: IconType = GoChecklist;
    const IconCompany: IconType = HiOutlineBuildingOffice2;
    const IconEdit = EditOutlined;
    const IconFile: IconType = LuFileText;
    const IconLoading = LoadingOutlined;
    const IconLock = LockOutlined;
    const IconLogout = PoweroffOutlined;
    const IconMail: IconType = GoMail;
    const IconMenu = MenuOutlined;
    const IconPlus: IconType = BsPlusLg;
    const IconSearch: IconType = BsSearch;
    const IconSearchPlus: IconType = LiaSearchPlusSolid;
    const IconTrash: IconType = BsTrash;
    const IconUpload: IconType = BsUpload;
    const IconUser: IconType = AiOutlineUser;
    const IconUserRole: IconType = GoTasklist;
    const IconUsers: IconType = HiOutlineUsers;

    return {
        IconAlert,
        IconChecklist,
        IconCompany,
        IconEdit,
        IconFile,
        IconLock,
        IconLoading,
        IconLogout,
        IconMail,
        IconPlus,
        IconMenu,
        IconSearch,
        IconSearchPlus,
        IconTrash,
        IconUpload,
        IconUser,
        IconUserRole,
        IconUsers,
    }

}