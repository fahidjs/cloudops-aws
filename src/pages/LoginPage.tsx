import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();

  const { user, loading: authLoading, refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", {
        replace: true,
      });
    }
  }, [user, authLoading, navigate]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");

      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await login(email, password);

      if (result.isSignedIn) {
        await refreshUser();

        navigate("/", {
          replace: true,
        });

        return;
      }

      console.log("Cognito next step:", result.nextStep);

      setError("Additional authentication is required.");
    } catch (err) {
      console.error(err);

      if (
        err instanceof Error &&
        err.name === "UserAlreadyAuthenticatedException"
      ) {
        await refreshUser();

        navigate("/", {
          replace: true,
        });

        return;
      }

      setError("Unable to sign in. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <main className="login-page">
        <div className="login-card">Checking authentication...</div>
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

        <div className="login-heading">
          <h2>Welcome back</h2>

          <p>Sign in to access your support dashboard.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
