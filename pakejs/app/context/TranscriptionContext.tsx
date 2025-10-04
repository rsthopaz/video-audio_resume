"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type TranscriptionData = {
  transcript: string;
  summary: string;
} | null;

type TranscriptionContextType = {
  result: TranscriptionData;
  setResult: (data: TranscriptionData) => void;
};

const TranscriptionContext = createContext<TranscriptionContextType | undefined>(undefined);

export function TranscriptionProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<TranscriptionData>(null);

  return (
    <TranscriptionContext.Provider value={{ result, setResult }}>
      {children}
    </TranscriptionContext.Provider>
  );
}

export function useTranscription() {
  const context = useContext(TranscriptionContext);
  if (!context) throw new Error("useTranscription must be used inside provider");
  return context;
}
