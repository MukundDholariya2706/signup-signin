import { useEffect } from "react";
import axios from "axios";

export const GithubLoginButton = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const loginWithGitHub = () => {
    const clientID = "Ov23liRqgO1C2DNLdd2n";
    const redirectURI = "http://localhost:3000";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  };

  useEffect(() => {
    const code = urlParams.get("code");

    if (code) {
      // Send code to backend
      axios
        .post("http://localhost:3001/auth/github-signup", {
          client_id: "Ov23liRqgO1C2DNLdd2n",
          client_secret: "a597dce8c8bf71b3d7e32d530ceb66702a7c927a",
          code,
        })
        .then((response) => {
          console.log(response, "response");
        });
    }
  }, [urlParams]);

  return <button onClick={loginWithGitHub}>Login with GitHub</button>;
};
