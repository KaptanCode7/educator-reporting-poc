import fs from "fs";

export const logJson = function (jsonObject: any) {
  if (process.env.ENVIRONMENT !== "development") {
    return true;
  }

  // Convert JSON object to string
  const jsonString = JSON.stringify(jsonObject, null, 2);

  // Define the file path
  const filePath = process.env.QUERY_DEBUG_LOG_FILENAME || "query-logs.json";

  // Write JSON string to file
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error("Error writing JSON to file:", err);
    } else {
      console.log("JSON has been written to", filePath);
    }
  });
};

export const isEmpty = function (value: null | undefined | any[]) {
  if (!value) {
    return true;
  }
  if (value.length == 0) {
    return true;
  }
  return false;
};

export const isNotEmpty = function (value: null | undefined | any[]) {
  return !isEmpty(value)
};