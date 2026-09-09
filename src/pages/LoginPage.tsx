import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  completeNewPassword,
  login,
} from "../services/authService";

import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();

  const {
    user,
    loading: authLoading,
    refreshUser,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [requiresNewPassword, setRequiresNewPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", {
        replace: true,
      });
    }
  }, [user, authLoading, navigate]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!email || !password) {
      setError(
        "Please enter your email and password.",
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await login(
        email,
        password,
      );

      if (result.isSignedIn) {
        await refreshUser();

        navigate("/", {
          replace: true,
        });

        return;
      }

      if (
        result.nextStep.signInStep ===
        "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        setRequiresNewPassword(true);
        return;
      }

      setError(
        "Additional authentication is required.",
      );
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to sign in.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleNewPasswordSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!newPassword) {
      setError(
        "Please enter a new password.",
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      const result =
        await completeNewPassword(
          newPassword,
        );

      if (result.isSignedIn) {
        await refreshUser();

        navigate("/", {
          replace: true,
        });

        return;
      }

      setError(
        "Additional authentication is required.",
      );
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to set new password.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <main className="login-page">
        <div className="login-card">
          Checking authentication...
        </div>
      </main>
    );
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <h1>CloudOps</h1>
          <p>IT Support Management</p>
        </div>

        {!requiresNewPassword ? (
          <>
            <div className="login-heading">
              <h2>Welcome back</h2>

              <p>
                Sign in to access your
                support dashboard.
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value,
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                />
              </div>

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading
                  ? "Signing in..."
                  : "Sign In"}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="login-heading">
              <h2>Set a new password</h2>

              <p>
                This is your first login.
                Create a permanent password
                to continue.
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={
                handleNewPasswordSubmit
              }
            >
              <div className="form-group">
                <label htmlFor="new-password">
                  New Password
                </label>

                <input
                  id="new-password"
                  type="password"
                  placeholder="Enter a new password"
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(
                      event.target.value,
                    )
                  }
                />
              </div>

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading
                  ? "Updating password..."
                  : "Set Password & Continue"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

export default LoginPage;