import React, { useEffect, useState } from "react";
import { fetchAllStocks, fetchStockPrices } from "../api/stockAPI";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

export default function StockPage() {
  const [stocks, setStocks] = useState({});
  const [selectedStock, setSelectedStock] = useState("NVDA");
  const [priceData, setPriceData] = useState([]);
  const [minutes, setMinutes] = useState(50);

  useEffect(() => {
    fetchAllStocks().then(data => setStocks(data.stocks));
  }, []);

  useEffect(() => {
    fetchStockPrices(selectedStock, minutes).then(data => setPriceData(data));
  }, [selectedStock, minutes]);

  return (
    <Box p={3}>
      <FormControl fullWidth>
        <InputLabel>Stock</InputLabel>
        <Select value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
          {Object.entries(stocks).map(([name, ticker]) => (
            <MenuItem key={ticker} value={ticker}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginTop: 20 }}>
        <InputLabel>Minutes</InputLabel>
        <Select value={minutes} onChange={(e) => setMinutes(e.target.value)}>
          {[10, 30, 50, 100].map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
        </Select>
      </FormControl>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={priceData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="lastUpdatedAt" />
          <YAxis dataKey="price" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
