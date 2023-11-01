// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { Injectable } from '@angular/core';


@Injectable()
export class CfUtil {

  // Constant code. 
  public static readonly payable: string = "2";
  public static readonly receivable: string = "1";
  public static readonly stk_tran: string = "0";  // stock transfer/mix/etc. 
  public static readonly pos_docTy: string = "404";
  public static readonly payable_str: string = "CR";
  public static readonly receivable_str: string = "DR";

  //-bsDatePicker
  //public static readonly bsDateOption: any = {minDate:new Date().getDate()-3653,maxDate:(new Date()).getDate()+7}; //-10 years restrict
  public static readonly bsDateConfig: any = {dateInputFormat: 'YYYY-MM-DD', containerClass: 'theme-blue'
  };
  public static readonly bsMonthConfig: any = {dateInputFormat: 'MMM YYYY', containerClass: 'theme-blue'};

  public static readonly daterange: any[] = [{ value: "", name: "*Date" }, { value: "0D", name: "Today" },
  { value: "-1D", name: "Yesterday" }, { value: "L7D", name: "Last 7 days" }, { value: "L30D", name: "Last 30 days" },
  { value: "L60D", name: "Last 60 days" }, { value: "L90D", name: "Last 90 days" },
  { value: "0M", name: "This Month" }, { value: "-1M", name: "Last Month" }, { value: "0Y", name: "This Year" },
  { value: "L1Y", name: "Last 1 Year" }, { value: "L2Y", name: "Last 2 Years" }, { value: "L3Y", name: "Last 3 Years" }];

  public static readonly daterangeFixed: any[] = [{ value: "", name: "*Date" }, { value: "0D", name: "Today" },
  { value: "-1D", name: "Yesterday" }, { value: "L7D", name: "Last 7 days" }, { value: "L30D", name: "Last 30 days" },
  { value: "L60D", name: "Last 60 days" }, { value: "L90D", name: "Last 90 days" },
  { value: "0M", name: "This Month" }, { value: "-1M", name: "Last Month" }, { value: "0Y", name: "This Year" },
  { value: "L1Y", name: "Last 1 Year" }, { value: "L2Y", name: "Last 2 Years" }, { value: "L3Y", name: "Last 3 Years" }];

  public static daterangeToDate(value) {
    //-note: new Date()'s month start from 0
    //const today: Date = new Date(); // new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    let dStart: Date = new Date();
    let dEnd: Date = new Date();
    switch (value) {
      case "0D": //-today
        break;
      case "-1D": //-yesterday
        dStart.setDate(dStart.getDate() - 1);
        dEnd = dStart;
        break;
      case "L7D": //-last 7 days
        dStart.setDate(dStart.getDate() - 6);
        break;
      case "L30D": //-last 30 days
        dStart.setDate(dStart.getDate() - 29);
        break;
      case "L60D": //-last 60 days
        dStart.setDate(dStart.getDate() - 59);
        break;
      case "L90D": //-last 90 days
        dStart.setDate(dStart.getDate() - 89);
        break;
      case "0M": //-this month
        dStart.setDate(1);
        break;
      case "-1M": //-last month
        dStart.setDate(1);
        dStart.setMonth(dStart.getMonth() - 1);
        dEnd.setDate(0);
        break;
      case "0Y": //-this year
        dStart.setDate(1);
        dStart.setMonth(0);
        break;
      case "L1Y": //-last 1 year
        dStart.setDate(dStart.getDate() +1);
        dStart.setFullYear(dStart.getFullYear() - 1);
        break;
      case "L2Y": //-last 2 year
        dStart.setDate(dStart.getDate() + 1);
        dStart.setFullYear(dStart.getFullYear() - 2);
        break;
      case "L3Y": //-last 3 year
        dStart.setDate(dStart.getDate() + 1);
        dStart.setFullYear(dStart.getFullYear() - 3);
        break;
      case "L4Y": //-last 4 year
        dStart.setDate(dStart.getDate() + 1);
        dStart.setFullYear(dStart.getFullYear() - 4);
        break;
      case "L5Y": //-last 5 year
        dStart.setDate(dStart.getDate() + 1);
        dStart.setFullYear(dStart.getFullYear() - 5);
        break;
      default:
        dStart = null;
        dEnd = null;
    }
    return { dStart: dStart, dEnd: dEnd };
  }

  public static dateToYMDStr(date: Date) {
    return date.getFullYear() + "-" + this.conv_2digit((date.getMonth() + 1).toString()) + "-" + this.conv_2digit(date.getDate());
  }

  public static conv_2digit(value: any) {
    return ("0" + value).slice(-2)
  }

}
