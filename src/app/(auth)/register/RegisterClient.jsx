"use client";

import AutoSignInCheckbox from "@/components/autoSignInCheckbox/AutoSignInCheckbox";
import Button from "@/components/button/Button";
import Divider from "@/components/divider/Divider";
import Input from "@/components/input/Input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loader from "../../../components/loader/Loader";
import styles from "../login/Auth.module.scss";
import LogoPath from "@/assets/colorful.svg";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

const RegisterClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const router = useRouter();

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);

        setIsLoading(false);

        toast.success("등록 성공");
        router.push("/login");
      })
      .catch((error) => {
        setIsLoading(false);
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

          <div className={styles.loginUser}>
            <form onSubmit={registerUser} className={styles.form}>
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

              <Input
                password
                icon="lock"
                id="password"
                name="password"
                label="비밀번호 확인"
                placeholder="비밀번호 확인"
                className={styles.control}
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <div className={styles.group}>
                <AutoSignInCheckbox
                  checked={isAutoLogin}
                  onChange={(e) => setIsAutoLogin(e.target.checked)}
                />

                <Link href={"./reset"} className={styles.findLink}>
                  비밀번호 수정하기
                  <svg
                    width="11"
                    height="18"
                    viewBox="0 0 11 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.findLink}
                  >
                    <path
                      d="M1.5 1L9.5 9L1.5 17"
                      stroke="#0074E9"
                      strokeWidth="2"
                    />
                  </svg>
                </Link>
              </div>
              <div className={styles.buttonGroup}>
                <Button type="submit" width="100%">
                  회원가입
                </Button>

                <Divider />
                <Button width="100%" secondary>
                  <Link href={"/login"}>로그인</Link>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterClient;
