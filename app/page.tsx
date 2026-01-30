"use client";

import { useState } from "react";
import { Play, StopCircle, Plus, Settings, Search, MoreVertical, Globe, Shield, Fingerprint, Users, Download, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Profile {
  id: string;
  name: string;
  browser: string;
  version: string;
  status: "stopped" | "running";
  proxy?: string;
  country?: string;
  group?: string;
  lastLaunch?: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: "1",
      name: "Profile Marketing 1",
      browser: "Camoufox",
      version: "133.0",
      status: "stopped",
      proxy: "US Proxy 1",
      country: "US",
      group: "Marketing",
      lastLaunch: "2 hours ago"
    },
    {
      id: "2",
      name: "Profile Dev Testing",
      browser: "Firefox",
      version: "132.0",
      status: "running",
      proxy: "UK Proxy 2",
      country: "GB",
      group: "Development",
      lastLaunch: "5 minutes ago"
    },
    {
      id: "3",
      name: "Profile Social Media",
      browser: "Chromium",
      version: "131.0",
      status: "stopped",
      proxy: "FR Proxy 3",
      country: "FR",
      group: "Social",
      lastLaunch: "1 day ago"
    },
    {
      id: "4",
      name: "Profile E-commerce",
      browser: "Brave",
      version: "1.73",
      status: "stopped",
      proxy: "DE Proxy 1",
      country: "DE",
      group: "E-commerce",
      lastLaunch: "3 hours ago"
    },
    {
      id: "5",
      name: "Profile Research",
      browser: "Wayfern",
      version: "1.0.2",
      status: "stopped",
      proxy: "CA Proxy 2",
      country: "CA",
      group: "Research",
      lastLaunch: "6 hours ago"
    }
  ]);

  const groups = ["all", "Marketing", "Development", "Social", "E-commerce", "Research"];

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === "all" || profile.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const statsData = [
    { label: "Total Profiles", value: profiles.length, icon: Users },
    { label: "Running", value: profiles.filter(p => p.status === "running").length, icon: Play },
    { label: "Proxies", value: "12", icon: Globe },
    { label: "Protected", value: "100%", icon: Shield }
  ];

  const toggleProfileStatus = (id: string) => {
    setProfiles(profiles.map(p => 
      p.id === id ? { ...p, status: p.status === "running" ? "stopped" : "running" as const } : p
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-1 flex items-center justify-center">
                <Fingerprint className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Donut Browser</h1>
                <p className="text-xs text-muted-foreground">Anti-Detection Browser Manager</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search profiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {groups.map(group => (
                <Button
                  key={group}
                  variant={selectedGroup === group ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGroup(group)}
                  className="whitespace-nowrap"
                >
                  {group === "all" ? "All Groups" : group}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Profiles Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Profile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Browser
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Proxy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Last Launch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProfiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Fingerprint className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{profile.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {profile.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-foreground">{profile.browser}</p>
                        <p className="text-xs text-muted-foreground">v{profile.version}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={profile.status === "running" ? "default" : "secondary"}
                        className={profile.status === "running" ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                      >
                        <div className={`w-2 h-2 rounded-full mr-2 ${profile.status === "running" ? "bg-green-500" : "bg-muted-foreground"}`} />
                        {profile.status === "running" ? "Running" : "Stopped"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {profile.country && (
                          <span className={`fi fi-${profile.country.toLowerCase()} text-base`} />
                        )}
                        <span className="text-sm text-foreground">{profile.proxy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline">{profile.group}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {profile.lastLaunch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={profile.status === "running" ? "destructive" : "default"}
                          onClick={() => toggleProfileStatus(profile.id)}
                        >
                          {profile.status === "running" ? (
                            <>
                              <StopCircle className="w-4 h-4 mr-1" />
                              Stop
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-1" />
                              Launch
                            </>
                          )}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Fingerprint className="w-4 h-4 mr-2" />
                              Configure Fingerprint
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Globe className="w-4 h-4 mr-2" />
                              Change Proxy
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Profile
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProfiles.length === 0 && (
            <div className="py-12 text-center">
              <Fingerprint className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No profiles found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
