/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { generateBookData, generateLoginData } from "../data/generateData";
import * as INTERFACES from "../interfaces/interfaces";

export async function makeBookRequest(): Promise<AxiosResponse<INTERFACES.BooksResponse>> {
  const bookData: INTERFACES.BookRequest = generateBookData();
  try {
    const response = await axios.post<INTERFACES.BooksResponse>(`${process.env.DEMOQA}/BookStore/v1/Books}`, bookData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw error;
    } else {
      console.error("Non-Axios error:", error);
      throw error;
    }
  }
}

export async function makeLoginRequest(): Promise<AxiosResponse<INTERFACES.UserResponse>> {
  const loginData: INTERFACES.UserRequest = generateLoginData();
  try {
    const response = await axios.post<INTERFACES.UserResponse>(`${process.env.DEMOQA}/Account/v1/User`, loginData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw error;
    } else {
      console.error("Non-Axios error:", error);
      throw error;
    }
  }
}

export async function createUserAccount(
  loginDataParam: INTERFACES.UserRequest = generateLoginData(),
): Promise<AxiosResponse<INTERFACES.ErrorResponse | INTERFACES.UserResponse>> {
  const loginData = loginDataParam;

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post<INTERFACES.UserResponse>(`${process.env.DEMOQA}/Account/v1/User`, loginData, config);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function makeTokenRequest(): Promise<AxiosResponse<INTERFACES.GenerateTokenResponse>> {
  const tokenData: INTERFACES.GenerateTokenRequest = generateLoginData();
  try {
    const response = await axios.post<INTERFACES.GenerateTokenResponse>(`${process.env.DEMOQA}/Account/v1/GenerateToken`, tokenData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw error;
    } else {
      console.error("Non-Axios error:", error);
      throw error;
    }
  }
}
