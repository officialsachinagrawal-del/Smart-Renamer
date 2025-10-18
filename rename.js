const fs = require("fs"); // fs = File System module → allows reading, writing, renaming, deleting files.
const path = require("path");  //path = helps to safely join paths (works cross-platform — Windows, Mac, Linux).

const replaceThis = "harry";
const replaceWith = "john";
const folder = __dirname; // __dirname-> built in Node variable that gives current folder's path
const preview = false; // false => actually rename, true => just show

 //fs.readdir() -> reads all files and subfolders in the directory.
fs.readdir(folder, (err, files) => { //files -> array of filenames (eg. ["hary.txt",hary.py'])
  if (err) {
    console.log("❌ Error reading folder:", err);
    return;
  }

  console.log("📂 Files found:", files);

  for (const file of files) {
    if (!file.includes(replaceThis)) continue; // only rename if contains "harry"

    const oldPath = path.join(folder, file); // safely combines folder + file name into a full path.
    const newPath = path.join(folder, file.replaceAll(replaceThis, replaceWith));

    if (fs.existsSync(newPath)) { // if meri file already exist krti h to use skip maar de
      console.log(`⚠️ Skipping: ${newPath} already exists`);
      continue;
    }

    if (!preview) {  // if same file nahi h to use rename kr do
      fs.rename(oldPath, newPath, (err) => {
        if (err) console.log("❌ Error renaming:", err);
        else console.log(`✅ Renamed: ${file} → ${path.basename(newPath)}`);
      });
    } else { // 
      console.log(`(Preview) Would rename: ${file} → ${path.basename(newPath)}`);
    };
  }
});
