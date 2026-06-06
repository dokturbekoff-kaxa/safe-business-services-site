import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const whatsappNumber = "996506212222";

export const whatsappMessages = {
  orderSite: "Здравствуйте, хочу заказать сайт.",
  price: "Здравствуйте, я бы хотел узнать стоимость такого формата сайта.",
};

export function whatsappLink(message = whatsappMessages.orderSite) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappUrl = whatsappLink();
