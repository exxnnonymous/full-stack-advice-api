import { useState ,useEffect} from "react";
import {
  Text,
  createStyles,
  Badge,
  Skeleton,
  Avatar,
} from "@mantine/core";
import { useModal } from "@/context/ModalLoadingContext";
import { useRouter } from "next/router";
import { useViewportSize } from "@mantine/hooks";

import { useAuth } from "@/context/AuthContext";
import DocsCard from "./DocsCard";
import UserButton from "./Avatar";
import StatsRingCard from "./Stats";
import styles from "@/styles/Dashboard.module.css";
import Chart from "./Chart";
import getMonthlyData from "@/helper/getMonthlyData";

const useStyles = createStyles((theme) => {
  return {
    chart_container: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderRadius: "10px ",
      padding: ".5rem",
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
      height: "fit-content",
    },
    dashboard_head: {
      fontSize: "1.8rem",
      fontWeight: 700,
      marginBottom: "5px",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[5]
          : theme.colors.gray[8],
      [theme.fn.smallerThan("sm")]:{
        paddingLeft:'60px',
        marginTop: "-5px",
      }
    },
    badge: {
      textTransform: "lowercase",
      cursor: "pointer",
      [theme.fn.smallerThan("sm")]:{
        marginTop:'.5rem'
      }
    },
    month_badge: {
      textTransform: "none",
      cursor: "pointer",
      margin: ".5rem 0 0 .5rem",
     
    },
  };
});

function Main({ setActivePage }) {
  const { classes } = useStyles();
  const { user, api_info, getApiData } = useAuth();
  const { startLoad } = useModal();
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState();
  const [dateData, setDateData] = useState(false);
  const [apiData, setApiData] = useState({});
  const [chartData, setChartData] = useState();
  const [records, setRecords] = useState();

  const { width } = useViewportSize();

  // fetching usage and stats of user based on apikey
  useEffect(() => {
    if (user) {
      getApiData(user.api_info.api_key);
    }
  }, []);


  // user datails to display
  const userDetails = {
    avatarName: user.name.substr(0,2).toUpperCase(),
    name: user.name,
    email: user.email,
    color: "indigo",
  };

  function getCurrentDate(date) {
    let strDate = date.date.toString();
    let strMonth = (date.month + 1).toString();
    if (strDate.length === 1) {
      strDate = 0 + strDate;
    }
    if (strMonth.length === 1) {
      strMonth = 0 + strMonth;
    }
    return {
      date: strDate,
      month: strMonth,
      year: date.year,
    };
  }

  const today_api_total = 15;

  
// generating data for chart
  useEffect(() => {
    if (api_info) {
      setCurrentDate(getCurrentDate(api_info.dateInfo));
      setDateData(true);
      setApiData({
        today: {
          total: today_api_total,
          usage: api_info.today_record.usage,
          remain: today_api_total - api_info.today_record.usage,
        },
        total_usage: api_info.totalUsage.toString(),
      });
      const record_data = getMonthlyData(
        api_info.monthly_records);
      setRecords(record_data);
      setChartData({
        labels: record_data.record.map((item) => item.date),
        datasets: [
          {
            label: "API Usage",
            data: record_data.record.map((item) => item.usage),
            borderColor: ["#c90e3d"],
            backgroundColor: ["#c90e3d"],
            tension: 0.5,
          },
        ],
      });
    }
  }, [api_info]);


  // static info 
  const title = "API Documentation";
  const description =
    "Use the API in the best possible way. Go and read the API docs and get idea to use the API.";

  function toggleDate() {
    setDateData((prev) => !prev);
  }


  if (!user) {
    return " ";
  }

  return (
    <div className={styles.dashboard_container}>
      <div className={styles.dash_header}>
          <Text className={classes.dashboard_head}>Dashboard</Text>
        <div
          onClick={() => {
            setActivePage("account");
          }}
          style={{ cursor: "pointer", height: "fit-content" }}
        >
          {width >= 850 ? (
            <UserButton {...userDetails} />
          ) : (
            <Avatar radius="xl" />
          )}
        </div>
      </div>
      <div>
        <Badge
          color="indigo"
          className={classes.badge}
          onClick={toggleDate}
          size="xl"
          radius="xs"
          variant="filled"
        >
          {dateData
            ? `${currentDate.month} / ${currentDate.date} / ${currentDate.year}`
            : "mm/dd/yyyy"}
        </Badge>
      </div>

      <div className={styles.dashboard_content}>
        <div className={`${styles.chart} ${classes.chart_container}`}>
          <Skeleton visible={chartData ? false : true}>
            <div style={{ minHeight: width >= 500 ? "250px" : "150px" }}>
              <div>
                <Badge
                  size="lg"
                  color="pink"
                  radius="xs"
                  variant="filled"
                  className={classes.month_badge}
                >
                  Stats of {records ? records.month : "..."}
                </Badge>
              </div>

              {chartData && <Chart chartData={chartData} />}
            </div>
          </Skeleton>
        </div>
        <div className={styles.aside}>
          <Skeleton visible={apiData.today ? false : true}>
            <div>
              <StatsRingCard
                title="API Usage Stats"
                completed={apiData.today ? apiData.today.usage : 0}
                total={apiData.today ? apiData.today.total : 15}
                stats={[
                  {
                    label: "Remaining Credits",
                    value: apiData.today ? apiData.today.remain : "...",
                  },
                  {
                    label: "Today Usage",
                    value: apiData.today ? apiData.today.usage : "...",
                  },
                ]}
                tillNow={{
                  label: "Total Usage",
                  value: apiData.total_usage ? apiData.total_usage : "...",
                }}
              />
            </div>
          </Skeleton>
          <div
            className={styles.blog}
            onClick={() => {
              startLoad();
              router.push("/docs");
            }}
          >
            <DocsCard title={title} description={description} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
