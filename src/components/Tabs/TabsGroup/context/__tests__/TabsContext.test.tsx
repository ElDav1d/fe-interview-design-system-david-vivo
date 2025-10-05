import { renderHook, act } from "@testing-library/react";
import { expect, it } from "vitest";
import { useTabs, TabsProvider } from "..";
import { ReactNode } from "react";

it("throws error when used outside TabsGroup", () => {
  expect(() => {
    renderHook(() => useTabs());
  }).toThrow("useTabs must be used within a TabsGroup");
});

it("returns initial context values", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TabsProvider variant="pill" defaultActiveTab="tab0">
      {children}
    </TabsProvider>
  );

  const { result } = renderHook(() => useTabs(), { wrapper });

  expect(result.current.variant).toBe("pill");
  expect(result.current.activeTab).toBe("tab0");
  expect(typeof result.current.setActiveTab).toBe("function");
});

it("updates activeTab when setActiveTab is called", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TabsProvider variant="pill" defaultActiveTab="tab0">
      {children}
    </TabsProvider>
  );

  const { result } = renderHook(() => useTabs(), { wrapper });

  act(() => {
    result.current.setActiveTab("tab2");
  });

  expect(result.current.activeTab).toBe("tab2");
});

it("maintains state across re-renders", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TabsProvider variant="underline" defaultActiveTab="tab1">
      {children}
    </TabsProvider>
  );
  const { result, rerender } = renderHook(() => useTabs(), { wrapper });

  act(() => {
    result.current.setActiveTab("tab2");
  });

  rerender();

  expect(result.current.activeTab).toBe("tab2");
});
