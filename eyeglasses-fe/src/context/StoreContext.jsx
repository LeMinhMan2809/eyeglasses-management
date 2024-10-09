import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const contextValue = {
    url,
    token,
    setToken,
    isFocused,
    setIsFocused,
  };

  return (
    <div>
      <StoreContext.Provider value={contextValue}>
        {props.children}
      </StoreContext.Provider>
    </div>
  );
};

export default StoreContextProvider;
