import { Table, Text, Title, Kbd, useMantineTheme, Tabs } from "@mantine/core";
import styles from "@/styles/Docs.module.css";
import { Prism } from "@mantine/prism";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import CodeSamples from "./CodeSamples";

function DocsMain({ setActiveNav }) {
  const theme = useMantineTheme();

  const url = `${process.env.public_url}/api/advice`;

  const main_url = `${url}?apiKey=your_api_key`;

  const advice_id_url = `${url}/{slip_id}?apiKey=your_api_key`;
  const advice_id_url_link = `${url}/1?apiKey=your_api_key`;

  const search_url = `${url}/search/{query}?apiKey=your_api_key`;
  const search_url_link = `${url}/search/spiders?apiKey=your_api_key`;

  // referencing table of content
  const [endpointRef, endpointInView] = useInView();
  const [objectRef, objectInView] = useInView({
    rootMargin: "-200px",
  });
  const [errorRef, errorInView] = useInView({
    rootMargin: "-200px",
  });
  const [codeRef, codeInView] = useInView({
    rootMargin: "-50px",
  });

  // looking whether the components are in view to change the timeline
  useEffect(() => {
    if (endpointInView && !objectInView) {
      setActiveNav(1);
    } else if (endpointInView && objectInView) {
      setActiveNav(2);
    } else if (objectInView && !errorInView) {
      setActiveNav(2);
    } else if (objectInView && errorInView) {
      setActiveNav(3);
    } else if (errorInView && !codeInView) {
      setActiveNav(3);
    } else if (errorInView && codeInView) {
      setActiveNav(4);
    } else if (codeInView && !errorInView) {
      setActiveNav(4);
    } else {
      setActiveNav(0);
    }
  }, [endpointInView, objectInView, errorInView]);

  // static api docs data
  const random_advice = [
    {
      title: "URL",
      desc: main_url,
      link: main_url,
      type: "url",
    },
    {
      title: "Description",
      desc: "Returns a random advice slip as a slip object",
      type: "text",
    },
    {
      title: "Parameters",
      desc: "",
      bold: "Required.",
      codekey: "apiKey",
      type: "parameter",
    },
  ];
  const advice_by_id = [
    {
      title: "URL",
      desc: advice_id_url,
      link: advice_id_url_link,
      type: "url",
    },
    {
      title: "Description",
      desc: "If an advice slip is found with the corresponding {slip_id}, a slip object is returned.",
      type: "text",
    },
    {
      title: "Parameters",
      desc: "",
      bold: "Required.",
      codekey: "apiKey",
      type: "parameter",
    },
  ];
  const searching_advice = [
    {
      title: "URL",
      desc: search_url,
      link: search_url_link,
      type: "url",
    },
    {
      title: "Description",
      desc: "If an advice slip is found, containing the corresponding search term in {query}, an array of slip objects is returned inside a search object.",
      type: "text",
    },
    {
      title: "Parameters",
      desc: "",
      bold: "Required.",
      codekey: "apiKey",
      type: "parameter",
    },
  ];
  const message_obj = {
    message: [
      {
        title: "type",
        desc: "The type of messages. Can be either noticed, warning or error.",
        type: "string",
      },
      {
        title: "text",
        desc: "The messages being received.",
        type: "string",
      },
    ],
    code: `  {
  "message": {
    "type": "notice",
    "text": "Advice slip not found."
  }
}
   `,
  };
  const slip_obj = {
    message: [
      {
        title: "slip_id",
        desc: "The unique ID of this advice slip.",
        type: "integer",
      },
      {
        title: "advice",
        desc: "The advice being given.",
        type: "string",
      },
    ],
    code: `  {
  "slip": {
    "slip_id": "2",
    "advice": "Smile and the world smiles with you. Frown and you're on your own."
  }
}
  `,
  };
  const search_obj = {
    message: [
      {
        title: "total_results",
        desc: "Total number of matching advice slips found.",
        type: "integer",
      },
      {
        title: "query",
        desc: "The search query provided.",
        type: "integer",
      },
      {
        title: "slips",
        desc: "An array of slip objects matching the search query.",
        type: "string",
      },
    ],
    code: `
{
  "total_results": "2",
  "slips": [
    {
      "advice": "Remember that spiders are more afraid of you, than you are of them."
    },
    {
      "advice":"Smile and the world smiles with you. Frown and you're on your own."
    }
   ]
}`,
  };

  //  to generate table rows for endpoints component
  function getRow(element) {
    if (element.type === "url") {
      return (
        <tr key={element.title}>
          <td className={styles.table_row}>{element.title}</td>
          <td>
            <a
              href={element.link}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: theme.colors.indigo[9],
              }}
            >
              {element.desc}
            </a>
          </td>
        </tr>
      );
    }
    if (element.type === "parameter") {
      return (
        <tr key={element.title}>
          <td>{element.title}</td>
          <td>
            <Kbd>{element.codekey}</Kbd>&nbsp;&nbsp;&nbsp;&nbsp;
            <strong>{element.bold}</strong> {element.desc}
          </td>
        </tr>
      );
    }
    return (
      <tr key={element.title}>
        <td>{element.title}</td>
        <td>{element.desc}</td>
      </tr>
    );
  }

  // to generate row for object component
  function getObjectRow(elem) {
    return (
      <tr key={elem.title}>
        <td className={styles.table_row}>{elem.title}</td>
        <td style={{ width: "80px" }}>{elem.type}</td>
        <td>{elem.desc}</td>
      </tr>
    );
  }

  // assigning rows to respective variables
  const random_advice_row = random_advice.map((element) => getRow(element));
  const advice_id_row = advice_by_id.map((element) => getRow(element));
  const searching_row = searching_advice.map((element) => getRow(element));

  const message_obj_row = message_obj.message.map((element) =>
    getObjectRow(element)
  );
  const slip_obj_row = slip_obj.message.map((element) => getObjectRow(element));
  const search_obj_row = search_obj.message.map((element) =>
    getObjectRow(element)
  );

  // putting all rows and information on array
  const objects = [
    {
      title: "Slip object",
      desc: "A slip object is a simple piece of advice.",
      code: slip_obj.code,
      obj_row: slip_obj_row,
    },
    {
      title: "Search object",
      desc: "A search object contains the results of a slip search query.",
      code: search_obj.code,
      obj_row: search_obj_row,
    },
  ];
  const advice_item = [
    {
      title: "Random Advice",
      desc: "Note: Advice is cached for 2 seconds. Any repeat-request within 2 seconds will return the same piece of advice.",
      advice_row: random_advice_row,
    },
    {
      title: "Advice by ID",
      desc: false,
      advice_row: advice_id_row,
    },
    {
      title: "Searching advice",
      desc: false,
      advice_row: searching_row,
    },
  ];

  // rendering the component
  return (
    <div>
      <Title style={{ fontWeight: 500 }} mb={25}>
        Endpoints
      </Title>
      <div className={styles.docs_endpoint_items} ref={endpointRef}>
        {advice_item.map((item) => (
          <EndpointsItems key={item.title} {...item} />
        ))}
      </div>

      <div className={styles.docs_objects} ref={objectRef}>
        <Title style={{ fontWeight: 500 }} mb={25}>
          Objects
        </Title>
        <div className={styles.docs_obj_items}>
          {objects.map((elem) => (
            <MessageObjects key={elem.title} {...elem} />
          ))}
        </div>
      </div>

      <div className={styles.docs_error_message} ref={errorRef}>
        <Title style={{ fontWeight: 500 }} mb={15}>
          Error messages
        </Title>
        <Text size="sm" mb={10}>
          A messages object contains information about the status of the
          requested API URL.
        </Text>
        <Tabs>
          <Tabs.Tab label="Response Fields">
            <Table
              striped
              highlightOnHover
              style={{
                border: `1px solid ${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[4]
                }`,
              }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{message_obj_row}</tbody>
            </Table>
          </Tabs.Tab>
          <Tabs.Tab label="Examples">
          <div style={{
              border: `1px solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[4]
              }`,
            }}>
            <Prism noCopy language="js">
              {message_obj.code}
            </Prism>
            </div>
          </Tabs.Tab>
        </Tabs>
      </div>
      <div ref={codeRef}>
        <CodeSamples />
      </div>
    </div>
  );
}

export default DocsMain;

function MessageObjects({ title, desc, obj_row, code }) {
  const theme = useMantineTheme();
  return (
    <div style={{ overflow: "hidden" }}>
      <Text mb={15} size="xl">
        {title}
      </Text>
      <Text size="sm" mb={10}>
        {desc}
      </Text>
      <Tabs>
        <Tabs.Tab label="Response Fields">
          <Table
            striped
            highlightOnHover
            style={{
              border: `1px solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[4]
              }`,
            }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{obj_row}</tbody>
          </Table>
        </Tabs.Tab>
        <Tabs.Tab label="Examples">
          <div style={{
            borderRadius:'5px',
              border: `1px solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[4]
              }`,
            }}>
          <Prism  noCopy language="js">
            {code}
          </Prism>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

function EndpointsItems({ title, desc, advice_row }) {
  const theme = useMantineTheme();
  return (
    <div className={styles.endpoint_item}>
      <Text mb={10} size="xl">
        {title}
      </Text>
      {desc && (
        <Text size="sm" mb={10}>
          {desc}
        </Text>
      )}
      <div style={{overflowX:"auto", width:'100%'}}>
        <Table
          striped
          className={styles.table}
          highlightOnHover
          style={{
            border: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[4]
            }`,
          }}
        >
          <thead>
            <tr>
              <th style={{minWidth:'98px'}}>HTTPS Method</th>
              <th>Get</th>
            </tr>
          </thead>
          <tbody>{advice_row}</tbody>
        </Table>
      </div>
    </div>
  );
}
