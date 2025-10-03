import { renderHook, act } from "@testing-library/react";
import { expect, it } from "vitest";
import { useTabs, TabsProvider } from "../TabsContext";
import { ReactNode } from "react";

it("throws error when used outside TabsGroup", () => {
  expect(() => {
    renderHook(() => useTabs());
  }).toThrow("useTabs must be used within a TabsGroup");
});

it("returns initial context values", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TabsProvider variant="pill" defaultActiveTab={0}>
      {children}
    </TabsProvider>
  );

  const { result } = renderHook(() => useTabs(), { wrapper });

  expect(result.current.variant).toBe("pill");
  expect(result.current.activeTab).toBe(0);
  expect(typeof result.current.setActiveTab).toBe("function");
});

it("updates activeTab when setActiveTab is called", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TabsProvider variant="pill" defaultActiveTab={0}>
      {children}
    </TabsProvider>
  );

  const { result } = renderHook(() => useTabs(), { wrapper });

  act(() => {
    result.current.setActiveTab(2);
  });

  expect(result.current.activeTab).toBe(2);
});

it("maintains state across re-renders", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TabsProvider variant="underline" defaultActiveTab={1}>
      {children}
    </TabsProvider>
  );
  const { result, rerender } = renderHook(() => useTabs(), { wrapper });

  act(() => {
    result.current.setActiveTab(2);
  });

  rerender();

  expect(result.current.activeTab).toBe(2);
});
