"use client";
import Image from "next/image";
import React, { useState } from "react";

import LogoPath from "@/assets/colorful.svg";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.scss";
import Loader from "@/components/loader/Loader";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import AutoSignInCheckbox from "@/components/autoSignInCheckbox/AutoSignInCheckbox";
import Divider from "@/components/divider/Divider";
import Link from "next/link";
import { toast } from "react-toastify";
import { auth } from "../../../firebase/firebase";
import { GoogleAuthProvider, signWithPopup } from "firebase/auth";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push("/");
  };

  const loginUser = (e) => {
    e.preventDefault();
    toast.info("성공!");
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);
        toast.success("로그인에 성공했습니다.");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signWithPopup(auth, provider)
      .then((result) => {
        toast.success("로그인에 성공했습니다.");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image priority src={LogoPath} alt="logo" />
          </h1>

          <form onSubmit={loginUser} className={styles.form}>
            <Input
              email
              icon="letter"
              id="email"
              name="email"
              label="이메일"
              placeholder="아이디(이메일)"
              className={styles.control}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              password
              icon="lock"
              id="password"
              name="password"
              label="비밀번호"
              placeholder="비밀번호"
              className={styles.control}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.loginUser}>
              <div className={styles.group}>
                <AutoSignInCheckbox
                  checked={isAutoLogin}
                  onChange={(e) => setIsAutoLogin(e.target.checked)}
                />
              </div>
              <div className={styles.buttonGroup}>
                <Button type="submit" width="100%">
                  로그인
                </Button>

                <Divider />
                <Button width="100%" secondary>
                  <Link href={"/register"}>회원가입</Link>
                </Button>

                <Divider />
                <Button onClick={signInWithGoogle}>구글 로그인</Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
