import {  Title, createStyles } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { useAuth } from "@/context/AuthContext";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
  },
  title: {
    fontWeight: "500",
    marginBottom: "2rem",
  },
}));






export default function CodeSamples() {
  const { user } = useAuth();
  const { classes } = useStyles();

  const base_url = `${process.env.public_url}/api/advice?`;
  const apikey = user ? user.api_info.api_key : "your_api_key";

  const javascript_code = `<script type="text/javascript">
    async function fetchAdviceAPI() {
        const api_key = '${apikey}';
        const response = await fetch('${base_url}apiKey=' + api_key);
        const result = response.json();
        return result;
    }
    const data = fetchAdviceAPI();
    console.log(data);
</script>`;

  const python_code = `try:
    from urllib.request import urlopen
except ImportError:
    from urllib2 import urlopen

api_key = '${apikey}'
api_url = '${base_url}'

url = api_url + 'apiKey=' + api_key 

print(urlopen(url).read().decode('utf8'))`;

const node_code = `var http = require('http');

var api_key = '${apikey}';
var api_url = '${base_url}';

var url = api_url + 'apiKey=' + api_key 

http.get(url, function(response) {
    var str = '';
    response.on('data', function(chunk) { str += chunk; });
    response.on('end', function() { console.log(str); });
}).end();`;


const java_code = `public class AdviceAPIQuery {
  public static void main(String[]args){
      String API_KEY = "${apikey}";
      String API_URL = "${base_url}";
      String url = API_URL + "&apiKey=" + API_KEY ;
      try (java.util.Scanner s = 
          new java.util.Scanner(new java.net.URL(url).openStream())) {
          System.out.println(s.useDelimiter("\\A").next());
      } catch (Exception ex) {
          ex.printStackTrace();
      }
  }
}`;

const php_code = `<?php
$api_key = "${apikey}";
$api_url = "${base_url}}";

$url = "{$api_url}?apiKey={$api_key}";

print(file_get_contents($url));`;

const c_code = `using System;
using System.Net;
using System.IO;

class Program {
    public const string API_KEY = "${apikey}";
    public const string API_URL = "${base_url}";

    static void Main() {
        string url = API_URL + $"apiKey={API_KEY}";
        string resultData = string.Empty;

        HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);

        using (HttpWebResponse response = (HttpWebResponse)req.GetResponse())
        using (Stream stream = response.GetResponseStream())
        using (StreamReader reader = new StreamReader(stream)) {
            resultData = reader.ReadToEnd();
        }

        Console.WriteLine(resultData);
    }
}`;


const perl_code = `#!/usr/bin/perl

use LWP::Simple;                # From CPAN
use JSON qw( decode_json );     # From CPAN
use Data::Dumper;
use strict;
use warnings;

my $api_key = "${apikey}";
my $api_url = "${base_url}}";

my $url = "$api_url?apiKey=$api_key";

getprint($url);`;

const powercell_code = `$api_key = "${apikey}"
$api_url = '${base_url}}'

$uri = "$api_url" + "apiKey=$api_key"

$j = Invoke-WebRequest -Uri $uri
echo "JSON:\`n---" $j.content "\`n"`;

const ruby_code = `require 'open-uri'

api_key = '${apikey}'
api_url = '${base_url}}'

url = api_url + 'apiKey=' + api_key 

puts open(url).read
`;

  return (
    <div className={classes.wrapper}>
      <Title className={classes.title} order={2} style={{fontWeight:500}}>
        Code samples for the major languages
      </Title>
      <Prism.Tabs>
        <Prism.Tab label="Javascript" language="html">
          {javascript_code}
        </Prism.Tab>
        <Prism.Tab label="Python" language="javascript">
          {python_code}
        </Prism.Tab>
        <Prism.Tab label="Node" language="javascript">
          {node_code}
        </Prism.Tab>
        <Prism.Tab label="Java" language="javascript">
          {java_code}
        </Prism.Tab>
        <Prism.Tab label="C#" language="javascript">
          {c_code}
        </Prism.Tab>
        <Prism.Tab label="Php" language="javascript">
          {php_code}
        </Prism.Tab>
        <Prism.Tab label="Perl" language="javascript">
          {perl_code}
        </Prism.Tab>
        <Prism.Tab label="Powercell" language="javascript">
          {powercell_code}
        </Prism.Tab>
        <Prism.Tab label="Ruby" language="javascript">
          {ruby_code}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
}
