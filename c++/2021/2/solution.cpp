#include <iostream>
#include <fstream>
#include <vector>

using namespace std;

vector<string> readInputLines() {
    fstream newfile;
    newfile.open("input", ios::in);

    vector<string> lines;
    if (newfile.is_open()) {
        string tp;
        while (getline(newfile, tp))
            lines.push_back(tp);
        newfile.close();
    } else
        throw std::runtime_error("Can't read input file");

    return lines;
}

int runPart1(vector<string> &lines) {
    int ups = 0;
    int downs = 0;
    int forwards = 0;

    for(auto &line: lines) {
        if (line.substr(0, 2) == "up")
            ups += stoi(line.substr(3, line.size()));
        if (line.substr(0, 4) == "down")
            downs += stoi(line.substr(5, line.size()));
        if (line.substr(0, 7) == "forward")
            forwards += stoi(line.substr(8, line.size()));
    }
    cout << "ups " << ups << endl;
    cout << "downs " << downs << endl;
    cout << "forwards " << forwards << endl;

    return forwards * (downs - ups);
}

int main() {
    vector<string> lines = readInputLines();
    int count = runPart1(lines);
    cout << count << endl;
    return 0;
}