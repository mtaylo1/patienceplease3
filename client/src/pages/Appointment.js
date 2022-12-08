import React from "react";
const nylas = window.nylas;
const Appoinment = () =>{
    const renderCalendar =() =>{
        var btn = document.getElementById('schedule-editor');
         btn.addEventListener('click', function() {
        // Prompt the Schedule Editor when a user clicks on the button
        nylas.scheduler.show({
          auth: {
            // Account <ACCESS_TOKEN> with active calendar scope
            accessToken: "<i8kppWbT94OIXpI3cZ5wuHlENHiRXW>", 
          },
          style: {
            // Style the Schedule Editor
            tintColor: '#32325d',
            backgroundColor: 'white',
          },
          defaults: {
            event: {
              title: '30-min Meeting',
              duration: 30,
            },
          },
        });
      });
    }
    return(
        <div>
             <button type="button" id="schedule-editor" onClick={renderCalendar}>Open Schedule Editor</button>
        </div>
    )
}

export default Appoinment;
