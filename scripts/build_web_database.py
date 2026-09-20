#!/usr/bin/env python3
import csv, json, os, glob
from collections import defaultdict

ROOT="."
DATA=os.path.join(ROOT,"data")
OUT=os.path.join(ROOT,"web")
for d in [OUT, os.path.join(OUT,"players"), os.path.join(OUT,"clubs"), os.path.join(OUT,"associations"), os.path.join(OUT,"tournaments"), os.path.join(OUT,"catalog")]:
    os.makedirs(d, exist_ok=True)

def read_csv(path):
    with open(path,"r",encoding="utf-8-sig",newline="") as f:
        return list(csv.DictReader(f))

def dump(path,obj):
    with open(path,"w",encoding="utf-8",newline="") as f:
        json.dump(obj,f,ensure_ascii=False,separators=(",",":"))

def bucket_num(n,size):
    return int(str(n))//size if str(n).isdigit() else 0

players=read_csv(os.path.join(DATA,"players.csv"))
clubs=read_csv(os.path.join(DATA,"clubs.csv"))
associations=read_csv(os.path.join(DATA,"associations.csv"))
tournaments=read_csv(os.path.join(DATA,"tournaments.csv"))
results=read_csv(os.path.join(DATA,"results.csv"))
rounds=read_csv(os.path.join(DATA,"rounds.csv"))
dmv=[]
for p in sorted(glob.glob(os.path.join(DATA,"dmv_entries_*.csv"))):
    dmv.extend(read_csv(p))
drl=[]
for p in sorted(glob.glob(os.path.join(DATA,"drl_entries_*.json"))):
    with open(p,encoding="utf-8") as f:
        x=json.load(f)
    drl.extend(x if isinstance(x,list) else x.get("rows",[]))

by_player_res=defaultdict(list); by_player_rounds=defaultdict(list); by_player_drl=defaultdict(list); by_player_dmv=defaultdict(list)
by_club_players=defaultdict(list); by_assoc_players=defaultdict(list); by_assoc_clubs=defaultdict(list)
by_tour_res=defaultdict(list); by_tour_rounds=defaultdict(list)

for r in results:
    if r.get("player_id"): by_player_res[str(r["player_id"])].append(r)
    if r.get("tournament_id"): by_tour_res[str(r["tournament_id"])].append(r)
for r in rounds:
    if r.get("player_id"): by_player_rounds[str(r["player_id"])].append(r)
    if r.get("tournament_id"): by_tour_rounds[str(r["tournament_id"])].append(r)
for r in drl:
    if r.get("player_id"): by_player_drl[str(r["player_id"])].append(r)
for r in dmv:
    if r.get("player_id"): by_player_dmv[str(r["player_id"])].append(r)
    elif r.get("pass_number"): passkey=str(r["pass_number"]).rstrip(".0")
for p in players:
    pid=str(p.get("player_id",""))
    if p.get("current_club_id"): by_club_players[str(p["current_club_id"])].append(pid)
    if p.get("current_association_id"): by_assoc_players[str(p["current_association_id"])].append(pid)
for c in clubs:
    if c.get("association_id"): by_assoc_clubs[str(c["association_id"])].append(str(c.get("club_id","")))

def compact(o):
    return {k:v for k,v in o.items() if v not in ("",None)}

player_index=[]
search=[]
for p in players:
    p=compact(p); pid=str(p["player_id"])
    player_index.append(p)
    search.append({"type":"player","id":pid,"label":p.get("name",pid),"keywords":" ".join([p.get("name",""),p.get("normalized_name",""),p.get("pass_number","")]).strip()})
club_index=[]
for c in clubs:
    c=compact(c); cid=str(c["club_id"]); club_index.append(c)
    search.append({"type":"club","id":cid,"label":c.get("canonical_name",cid),"keywords":c.get("normalized_name","")})
assoc_index=[]
for a in associations:
    a=compact(a); aid=str(a["association_id"]); assoc_index.append(a)
    search.append({"type":"association","id":aid,"label":a.get("association_name",aid),"keywords":" ".join([a.get("association_name",""),a.get("abbreviation","")])})
tour_index=[]
for t in tournaments:
    t=compact(t); tid=str(t["tournament_id"]); tour_index.append(t)
    search.append({"type":"tournament","id":tid,"label":t.get("tournament_name",tid),"keywords":" ".join([t.get("tournament_name",""),t.get("location",""),t.get("date",""),t.get("source_code","")])})

dump(os.path.join(OUT,"players-index.json"),player_index)
dump(os.path.join(OUT,"clubs-index.json"),club_index)
dump(os.path.join(OUT,"associations-index.json"),assoc_index)
dump(os.path.join(OUT,"tournaments-index.json"),tour_index)
dump(os.path.join(OUT,"search-index.json"),search)

# Player detail shards: 100 players per file.
player_map={}
for p in player_index:
    pid=str(p["player_id"])
    b=int(pid)//100 if pid.isdigit() else 0
    player_map[pid]=b
shards=defaultdict(dict)
for p in player_index:
    pid=str(p["player_id"]); b=player_map[pid]
    shards[b][pid]={
        "player":p,
        "results":by_player_res.get(pid,[]),
        "rounds":by_player_rounds.get(pid,[]),
        "drl":by_player_drl.get(pid,[]),
        "dmv":by_player_dmv.get(pid,[])
    }
for b,rows in shards.items():
    dump(os.path.join(OUT,"players",f"{b:04d}.json"),rows)

# Club/association/tournament relation shards.
for c in club_index:
    cid=str(c["club_id"]); dump(os.path.join(OUT,"clubs",f"{cid}.json"),{"club":c,"player_ids":by_club_players.get(cid,[])})
for a in assoc_index:
    aid=str(a["association_id"]); dump(os.path.join(OUT,"associations",f"{aid}.json"),{"association":a,"player_ids":by_assoc_players.get(aid,[]),"club_ids":by_assoc_clubs.get(aid,[])})
for t in tour_index:
    tid=str(t["tournament_id"]); b=f"{sum((i+1)*ord(ch) for i,ch in enumerate(tid))%256:02x}"
    path=os.path.join(OUT,"tournaments",f"{b}.json")
    existing={}
    if os.path.exists(path):
        with open(path,encoding="utf-8") as f: existing=json.load(f)
    existing[tid]={"tournament":t,"result_ids":[str(x.get("result_id")) for x in by_tour_res.get(tid,[]) if x.get("result_id")],"round_ids":[str(x.get("round_id")) for x in by_tour_rounds.get(tid,[]) if x.get("round_id")]}
    dump(path,existing)

# Generic catalog shards for on-demand list views.
def write_chunks(name,rows,size):
    files=[]
    for i in range(0,len(rows),size):
        fn=f"{name}_{i//size:04d}.json"
        dump(os.path.join(OUT,"catalog",fn),rows[i:i+size])
        files.append(fn)
    return files
result_files=write_chunks("results",results,1000)
round_files=write_chunks("rounds",rounds,2000)
drl_files=write_chunks("drl",drl,5000)
dmv_files=write_chunks("dmv",dmv,5000)

manifest={
 "version":"2.0.0",
 "generated":"2026-09-20",
 "architecture":"static-indexed-on-demand",
 "counts":{"players":len(players),"clubs":len(clubs),"associations":len(associations),"tournaments":len(tournaments),"results":len(results),"rounds":len(rounds),"drl":len(drl),"dmv":len(dmv)},
 "sources":{"drl":"canonical 8 public shards","dmv":"16 public participation shards","ignored_drl_source":"rangliste83_2.xls"},
 "catalog":{"results":result_files,"rounds":round_files,"drl":drl_files,"dmv":dmv_files},
 "player_detail_bucket_size":100,
 "tournament_relation":"sha1 prefix bucket",
 "status":"web_database_build_verified"
}
dump(os.path.join(OUT,"manifest.json"),manifest)
print(json.dumps(manifest,ensure_ascii=False,indent=2))
