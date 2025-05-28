from fastapi import FastAPI
from pydantic import BaseModel
from fpl import poverty_line

class DataForm(BaseModel):
    HouseholdSize: int
    HHEOD: bool
    EarnedIncomePreTax: float
    OtherIncome: float
    TotalAssets: float

app = FastAPI()

async def calculate_snap_eligibility(data: DataForm):
    if HHEOD:
        gross_test = data.EarnedIncomePreTax + data.OtherIncome
    return 

@app.get("/")
async def root():
    return {"message": fpl_100_percent[0]}
