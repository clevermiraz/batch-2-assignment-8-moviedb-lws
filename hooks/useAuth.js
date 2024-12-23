import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
    const { auth, setAuth } = useContext(AuthContext);

    return { auth, setAuth };
};
