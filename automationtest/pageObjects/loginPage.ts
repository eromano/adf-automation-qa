import { by } from "protractor";
/**
 * This contains all the Locator present in the Login Page
 */
export class LoginPage {
  userName = by.id("username");
  password = by.id("password");
  signInButton = by.id("login-button");
}
