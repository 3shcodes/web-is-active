"use client"

import { useTheme } from "next-themes"
import {ChangeEvent} from "react";

function ThemeSwitch() {

    const { theme, setTheme } = useTheme();

    function changeTheme(e:ChangeEvent<HTMLSelectElement>){
        setTheme(e.target.value);
    }


    return (
        <>
            <select value={theme} onChange={changeTheme} className="p-2 rounded ">
                <option value="light" >Light</option>
                <option value="dark" >Dark</option>
                <option value="system" >System</option>
            </select>
        </>
    )
}

export default ThemeSwitch;
