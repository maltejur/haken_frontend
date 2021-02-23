import { Text } from "@geist-ui/react";
import Link from "next/link";
import { LogIn, LogOut, User } from "@geist-ui/react-icons";
import IconButton from "./iconButton";
import Cookies from "js-cookie";

export default function Navbar() {
  function logout() {
    Cookies.remove("token");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Link href="/">
        <Text h1 style={{ cursor: "pointer" }}>
          Haken
        </Text>
      </Link>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        {process.browser &&
          (Cookies.get("token") ? (
            <>
              <Link href="/profile">
                <IconButton>
                  <User />
                </IconButton>
              </Link>
              <Link href="/">
                <IconButton onClick={logout}>
                  <LogOut />
                </IconButton>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <IconButton>
                <LogIn />
              </IconButton>
            </Link>
          ))}
      </div>
    </div>
  );
}
