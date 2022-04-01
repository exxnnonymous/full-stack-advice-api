import Main from "./Main/Main";
import Setting from "./Parts/Setting";
import Account from "./Parts/Account";

function DashboardLayout({ activePage, setActivePage,opened ,toggleOpened}) {
  return (
    <div className="dashboard_middle">
      {activePage === "main" ? (
        <Main setActivePage={setActivePage} toggleOpened={toggleOpened} opened={opened}/>
      ) : activePage === "account" ? (
        <Account />
      ) : activePage === "setting" ? (
        <Setting />
      ) : (
        <Main setActivePage={setActivePage}/>
      )}
    </div>
  );
}

export default DashboardLayout;
