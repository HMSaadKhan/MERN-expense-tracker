/* eslint-disable @typescript-eslint/no-explicit-any */
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface DatePickerProps {
  date?: dayjs.Dayjs | null;
  minDate?: dayjs.Dayjs | null;
  maxDate?: dayjs.Dayjs | null;
  placeholder?: string | undefined;
  shouldDisableDate?: ((day: dayjs.Dayjs | undefined) => boolean) | undefined;
  onChange?: (value: dayjs.Dayjs | null | undefined, mode?: string) => void;
  onClear?: () => void;
  mode?: string;
  isDob?: boolean;
  isError?: boolean;
  greyBorder?: boolean;
  disableClear?: boolean;
  disableFutures?: boolean;
  isMonth?: boolean;
}

const CustomDatePicker: FC<DatePickerProps> = ({
  date,
  mode,
  placeholder,
  shouldDisableDate,
  onChange,
  onClear,
  isDob,
  minDate,
  maxDate,
  isError,
  greyBorder,
  disableClear,
  disableFutures,
  isMonth,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          disableFuture={isDob || disableFutures}
          open={open}
          value={date}
          minDate={minDate ? minDate : undefined}
          maxDate={maxDate ? maxDate : undefined}
          views={isMonth ? ["year", "month"] : ["year", "month", "date"]}
          view={isMonth ? "month" : "day"}
          onYearChange={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          shouldDisableDate={shouldDisableDate}
          onChange={(newValue: any) => {
            onChange?.(newValue, mode);
            setOpen(false);
          }}
          renderInput={(params: any) => {
            return (
              <>
                <TextField
                  {...params}
                  onClick={() => setOpen(true)}
                  variant="standard"
                  sx={{
                    border: `1px solid ${
                      isError ? "red" : greyBorder ? "#dee2e6" : "black"
                    }`,
                    background: "white",
                    padding: "6px",
                    paddingRight: "20px",
                    "& .MuiInputBase-root": {
                      borderRadius: "3px",
                    },
                    "& .MuiInput-input": {
                      fontSize: "14px !important",
                      fontFamily: "sans-serif",
                      padding: "0.5px",
                      cursor: "pointer !important",
                    },
                    "& .MuiInput-root": {
                      "&:before, :after, :hover:not(.Mui-disabled):before": {
                        borderBottom: 0,
                        padding: 0,
                      },
                    },
                  }}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: placeholder,
                    readOnly: true,
                  }}
                  InputProps={{
                    ...params.InputProps,
                    readOnly: true,
                    endAdornment: (
                      <>
                        {date && !disableClear && (
                          <CloseIcon
                            className="cursor-pointer"
                            onClick={(e: any) => {
                              onClear?.();
                              if (onClear) {
                                onChange?.(null, mode);
                              }
                              e.stopPropagation();
                            }}
                          />
                        )}
                        {params.InputProps?.endAdornment}
                      </>
                    ),
                  }}
                />
              </>
            );
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default CustomDatePicker;
