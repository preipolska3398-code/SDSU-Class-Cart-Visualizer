"use strict";

setTimeout(2000);

function getInstructors(){
    const selectors = [
            'td[headers*="Instructor"]',
            '[class*="Instructor"]',
            'td:nth-child(8)' 
        ];
        
    for (let selectors of selectors) {
            let cells = document.querySelectorAll(selector);
            if (cells.length > 0) {
                return cells; 
            }
        }

        return { cells: [], selectors: null}; 
    
}

function getSchedules(){
    const selectors = [
            'td[headers*="Days"]',
            'td[headers*="Times"]',
            '[class*="Meeting"]',
            'td:nth-child(6)' 
        ];

     for (let selectors of selectors) {
            let cells = document.querySelectorAll(selector);
            if (cells.length > 0) {
                return cells; 
            }
        }

        return { cells: [], selectors: null};  
}

function getSeats(){
  const selectors = [
            'td[headers*="Seats"]',
            '[class*="Seats"]',
            'td:nth-child(9)' 
        ]
   for (let selectors of selectors) {
            let cells = document.querySelectorAll(selector);
            if (cells.length > 0) {
                return cells; 
            }
        }

        return { cells: [], selectors: null};  
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "requestData") {
            accessSDSUPageData();
        }
    });
