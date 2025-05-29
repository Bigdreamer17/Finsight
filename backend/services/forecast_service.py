import os
import pandas as pd
from datetime import datetime
from supabase import create_client
from prophet import Prophet

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def fetch_historical_data(company_id: str, metric: str):
    """
    Fetch historical metric data for a given company and metric
    """
    response = supabase.table("income_statement") \
        .select("fiscal_year, " + metric) \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=False) \
        .execute()

    data = response.data
    df = pd.DataFrame(data)
    df = df.dropna(subset=[metric])

    # Convert to Prophet format
    df = df.rename(columns={
        "fiscal_year": "ds",
        metric: "y"
    })
    df["ds"] = pd.to_datetime(df["ds"], format="%Y")
    return df

def forecast_metric(df: pd.DataFrame, periods: int = 3):
    """
    Forecast the metric using Facebook Prophet
    """
    model = Prophet(yearly_seasonality=False, daily_seasonality=False)
    model.fit(df)

    future = model.make_future_dataframe(periods=periods, freq='Y')
    forecast = model.predict(future)

    forecast_years = forecast.tail(periods)
    result = forecast_years[["ds", "yhat"]].copy()
    result["fiscal_year"] = result["ds"].dt.year
    result["value"] = result["yhat"].round(2)
    return result[["fiscal_year", "value"]].to_dict(orient="records")

def get_forecasts_for_company(company_id: str):
    """
    Return forecasts for revenue, net profit, and EPS for a given company
    """
    metrics = {
        "revenue": "total_operating_income",
        "net_profit": "profit_for_year",
        "eps": "basic_eps"
    }

    forecasts = {}

    for key, column in metrics.items():
        df = fetch_historical_data(company_id, column)
        if df.empty or len(df) < 2:
            forecasts[key] = {"graph": [], "stats": {}}
            continue

        try:
            forecast_result = forecast_metric(df)
            stats_df = pd.DataFrame(forecast_result)
            forecasts[key] = {
                "graph": forecast_result,
                "stats": compute_metric_stats(stats_df, "value")
            }
        except Exception as e:
            print(f"Error forecasting {key}: {e}")
            forecasts[key] = {"graph": [], "stats": {}}


    return forecasts

def compute_metric_stats(df: pd.DataFrame, value_column: str):
    """
    Compute statistics (mean, median, min, max, std) for a given column in a DataFrame
    """
    stats = {
        "mean": round(df[value_column].mean(), 2),
        "median": round(df[value_column].median(), 2),
        "min": round(df[value_column].min(), 2),
        "max": round(df[value_column].max(), 2),
        "std_dev": round(df[value_column].std(), 2)
    }
    return stats
