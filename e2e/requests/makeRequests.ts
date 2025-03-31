/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { generateBookData, generateLoginData } from "../data/generateData";
import * as INTERFACES from "../interfaces/interfaces";

export async function getBooksRequest(): Promise<AxiosResponse<INTERFACES.getBooksResponse>> {
  try {
    const response = await axios.get<INTERFACES.getBooksResponse>(`${process.env.DEMOQA}/BookStore/v1/Books`);
    process.env.ISBN = response.data.books[0].isbn;
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

export async function makeBookRequest(
  bookData: INTERFACES.BookRequest = generateBookData(),
  Bearer: string = process.env.TOKEN!,
): Promise<AxiosResponse<INTERFACES.BooksResponse>> {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${Bearer}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post<INTERFACES.BooksResponse>(`${process.env.DEMOQA}/BookStore/v1/Books`, bookData, config);
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

export async function generateTokenRequest(
  loginDataParam: INTERFACES.GenerateTokenRequest,
): Promise<AxiosResponse<INTERFACES.GenerateTokenResponse>> {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post<INTERFACES.GenerateTokenResponse>(
      `${process.env.DEMOQA}/Account/v1/GenerateToken`,
      loginDataParam,
      config,
    );
    process.env.TOKEN = response.data.token;
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
  process.env.PASSWORD = loginData.password;
  process.env.USERNAME = loginData.userName;

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post<INTERFACES.UserResponse>(`${process.env.DEMOQA}/Account/v1/User`, loginData, config);
    process.env.USER_ID = response.data.userID;
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
