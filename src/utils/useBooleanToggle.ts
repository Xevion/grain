import { useCallback, useState } from "preact/hooks";

export function useBooleanToggle(
  initialValue: boolean = false
): [boolean, (nextValue?: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback((nextValue?: boolean) => {
    if (typeof nextValue === "boolean") {
      setValue(nextValue);
      return;
    }
    setValue((prev) => !prev);
  }, []);

  return [value, toggle];
}

