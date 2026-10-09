"use strict";

setTimeout(2000);

function getInstructors(){
    const selectors = [
            'td[headers*="Instructor"]',
            '[class*="Instructor"]',
            'td:nth-child(8)' 
        ];
        
    for (const selector of selectors) {
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

     for (const selector of selectors) {
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
   for (const selector of selectors) {
            let cells = document.querySelectorAll(selector);
            if (cells.length > 0) {
                return cells; 
            }
        }

        return { cells: [], selectors: null};  
}

function getClassName(){
  const selectors = [
            'h1',
            'h2',
            'h3',
            '[class*="Course"]'
        ]
   for (const selector of selectors) {
            let cells = document.querySelectorAll(selector);
            if (cells.length > 0) {
                return cells; 
            }
        }

        return { cells: [], selectors: null};  
}

function getLocation(){
  const selectors = [
            'td[headers*="Room"]',
            '[class*="Room"]',
            'td:nth-child(0)' 
        ]
   for (const selector of selectors) {
            let cells = document.querySelectorAll(selector);
            if (cells.length > 0) {
                return cells; 
            }
        }

        return { cells: [], selectors: null};  
}

function accessSDSUPageData() {
    const data = {
        courseName: getClassName()[0]?.textContent?.trim() || '',
        instructor: getInstructors()[0]?.textContent?.trim() || '',
        schedule: getSchedules()[0]?.textContent?.trim() || '',
        seats: getSeats()[0]?.textContent?.trim() || '',
        location: getLocation()[0]?.textContent?.trim() || ''
    };

    chrome.storage.local.set({ aztecScheduleSyncData: data });
    return data;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "requestData") {
            const data = accessSDSUPageData();
            sendResponse({ data });
        }
    });
