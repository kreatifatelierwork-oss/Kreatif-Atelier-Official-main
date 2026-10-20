"use client";

import { useEffect } from "react";
import { serviceById } from "@/content/services";
import { useCart } from "./store";

/** Loads the saved cart once on the client, dropping any id that is no longer a service. */
export function useCartHydration() {
  useEffect(() => {
    void Promise.resolve(useCart.persist.rehydrate()).then(() => {
      const { items } = useCart.getState();
      const valid = items.filter((id) => serviceById(id));
      if (valid.length !== items.length) useCart.setState({ items: valid });
    });
  }, []);
}
