import { createContext, useContext, useEffect, useState } from "react";
const ListContext = createContext();
function ContextProvider({ children }) {
  const [list,setList] = useState([]);
  const [page,setPage] = useState(0);
  return (
    <ListContext.Provider
      value={{
        list,
        setList,
        page,setPage
      }}
    >{children}</ListContext.Provider>
  )
}
export const ListState = () => {
  return useContext(ListContext);
};
export default ContextProvider;