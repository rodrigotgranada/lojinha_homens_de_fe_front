import React, { createContext, useContext, ReactNode } from "react";
import { EventContextProps } from "../types";

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider = ({
  children,
  value
}: {
  children: ReactNode;
  value: EventContextProps;
}) => {
  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
