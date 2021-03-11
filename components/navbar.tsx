import { Link, Text } from "@geist-ui/react";
import NextLink from "next/link";
import { LogIn, LogOut, Upload, User } from "@geist-ui/react-icons";
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
      <NextLink href="/" passHref>
        <Link>
          <Text h1 style={{ cursor: "pointer" }}>
            Haken
          </Text>
        </Link>
      </NextLink>

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
              <NextLink href="/upload">
                <IconButton>
                  <Upload />
                </IconButton>
              </NextLink>
              <NextLink href="/">
                <IconButton onClick={logout}>
                  <LogOut />
                </IconButton>
              </NextLink>
            </>
          ) : (
            <NextLink href="/login">
              <IconButton>
                <LogIn />
              </IconButton>
            </NextLink>
          ))}
      </div>
    </div>
  );
}
