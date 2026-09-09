import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  signIn,
  signOut,
} from "aws-amplify/auth";

export async function login(
  email: string,
  password: string,
) {
  try {
    await getCurrentUser();

    // Cognito still has an existing session.
    // Clear it before starting a fresh login.
    await signOut();
  } catch {
    // No authenticated user exists, which is fine.
  }

  return await signIn({
    username: email,
    password,
  });
}

export async function logout() {
  await signOut();
}

export async function getAuthenticatedUser() {
  try {
    const user = await getCurrentUser();

    const attributes =
      await fetchUserAttributes();

    return {
      username: user.username,
      userId: user.userId,
      email: attributes.email ?? "",
    };
  } catch {
    return null;
  }
}

export async function getAccessToken(): Promise<string> {
  const session = await fetchAuthSession();

  const accessToken =
    session.tokens?.accessToken?.toString();

  if (!accessToken) {
    throw new Error(
      "No authentication token available.",
    );
  }

  return accessToken;
}