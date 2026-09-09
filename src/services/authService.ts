import {
  fetchUserAttributes,
  getCurrentUser,
  signIn,
  signOut,
} from "aws-amplify/auth";

export async function login(
  email: string,
  password: string,
) {
  const result = await signIn({
    username: email,
    password,
  });

  return result;
}

export async function logout() {
  await signOut();
}

export async function getAuthenticatedUser() {
  try {
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();

    return {
      username: user.username,
      userId: user.userId,
      email: attributes.email ?? "",
    };
  } catch {
    return null;
  }
}