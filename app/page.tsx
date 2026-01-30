"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  MoreVertical,
  Play,
  Settings,
  Globe,
  Users,
  Activity,
  TrendingUp,
  Folder,
  Edit,
  Trash2,
  Copy,
  Filter,
  Download,
  Upload,
} from "lucide-react";

// Mock data for preview
const mockProfiles = [
  {
    id: "1",
    name: "E-commerce Account 1",
    browser: "Firefox",
    status: "running",
    proxy: "US - New York",
    group: "E-commerce",
    lastUsed: "2 min ago",
    fingerprint: "Chrome 120 / Windows",
  },
  {
    id: "2",
    name: "Social Media Manager",
    browser: "Chromium",
    status: "stopped",
    proxy: "UK - London",
    group: "Social",
    lastUsed: "1 hour ago",
    fingerprint: "Firefox 121 / macOS",
  },
  {
    id: "3",
    name: "Testing Profile",
    browser: "Brave",
    status: "stopped",
    proxy: "FR - Paris",
    group: "Development",
    lastUsed: "3 hours ago",
    fingerprint: "Safari 17 / iOS",
  },
  {
    id: "4",
    name: "Marketing Campaign",
    browser: "Camoufox",
    status: "running",
    proxy: "DE - Berlin",
    group: "Marketing",
    lastUsed: "5 min ago",
    fingerprint: "Chrome 119 / Linux",
  },
  {
    id: "5",
    name: "Research Account",
    browser: "Zen",
    status: "stopped",
    proxy: "CA - Toronto",
    group: "Research",
    lastUsed: "1 day ago",
    fingerprint: "Edge 120 / Windows",
  },
];

const mockStats = {
  totalProfiles: 47,
  runningProfiles: 12,
  totalGroups: 8,
  activeProxies: 23,
};

export default function DonutBrowserDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [profiles, setProfiles] = useState(mockProfiles);
  
  // Form states
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileBrowser, setNewProfileBrowser] = useState("firefox");
  const [newProfileProxy, setNewProfileProxy] = useState("");
  const [newProfileGroup, setNewProfileGroup] = useState("");

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const matchesSearch = profile.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGroup =
        selectedGroup === "all" || profile.group === selectedGroup;
      const matchesStatus =
        selectedStatus === "all" || profile.status === selectedStatus;
      return matchesSearch && matchesGroup && matchesStatus;
    });
  }, [profiles, searchQuery, selectedGroup, selectedStatus]);

  const handleCreateProfile = () => {
    const newProfile = {
      id: String(profiles.length + 1),
      name: newProfileName || `Profile ${profiles.length + 1}`,
      browser: newProfileBrowser,
      status: "stopped",
      proxy: newProfileProxy || "No proxy",
      group: newProfileGroup || "Default",
      lastUsed: "Just now",
      fingerprint: "Chrome 120 / Windows",
    };
    setProfiles([...profiles, newProfile]);
    setCreateDialogOpen(false);
    setNewProfileName("");
    setNewProfileProxy("");
    setNewProfileGroup("");
  };

  const handleToggleStatus = (profileId: string) => {
    setProfiles(
      profiles.map((p) =>
        p.id === profileId
          ? { ...p, status: p.status === "running" ? "stopped" : "running" }
          : p
      )
    );
  };

  const handleDeleteProfile = (profileId: string) => {
    setProfiles(profiles.filter((p) => p.id !== profileId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60">
                <Globe className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Donut Browser
                </h1>
                <p className="text-xs text-muted-foreground">
                  Anti-Detection Profile Manager
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Profiles
                </p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {mockStats.totalProfiles}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Running Now
                </p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {mockStats.runningProfiles}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Groups
                </p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {mockStats.totalGroups}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Folder className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Active Proxies
                </p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {mockStats.activeProxies}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search profiles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Groups" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="stopped">Stopped</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 sm:flex-none">
                  <Plus className="w-4 h-4 mr-2" />
                  New Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Profile</DialogTitle>
                  <DialogDescription>
                    Configure a new browser profile with custom fingerprint and proxy settings.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Profile Name</Label>
                    <Input
                      id="name"
                      placeholder="My Profile"
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="browser">Browser Type</Label>
                    <Select
                      value={newProfileBrowser}
                      onValueChange={setNewProfileBrowser}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="firefox">Firefox</SelectItem>
                        <SelectItem value="chromium">Chromium</SelectItem>
                        <SelectItem value="brave">Brave</SelectItem>
                        <SelectItem value="camoufox">Camoufox</SelectItem>
                        <SelectItem value="zen">Zen Browser</SelectItem>
                        <SelectItem value="wayfern">Wayfern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proxy">Proxy (Optional)</Label>
                    <Input
                      id="proxy"
                      placeholder="ip:port:user:pass"
                      value={newProfileProxy}
                      onChange={(e) => setNewProfileProxy(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="group">Group</Label>
                    <Input
                      id="group"
                      placeholder="Default"
                      value={newProfileGroup}
                      onChange={(e) => setNewProfileGroup(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProfile}>Create Profile</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="icon">
              <Upload className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Profiles Table */}
        <Card className="border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-semibold">Profile Name</TableHead>
                <TableHead className="font-semibold">Browser</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Proxy</TableHead>
                <TableHead className="font-semibold">Group</TableHead>
                <TableHead className="font-semibold">Fingerprint</TableHead>
                <TableHead className="font-semibold">Last Used</TableHead>
                <TableHead className="text-right font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile) => (
                <TableRow key={profile.id} className="border-border">
                  <TableCell className="font-medium text-foreground">
                    {profile.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {profile.browser}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        profile.status === "running" ? "default" : "secondary"
                      }
                      className={
                        profile.status === "running"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : ""
                      }
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          profile.status === "running"
                            ? "bg-green-500"
                            : "bg-muted-foreground"
                        }`}
                      />
                      {profile.status === "running" ? "Running" : "Stopped"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {profile.proxy}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{profile.group}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {profile.fingerprint}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {profile.lastUsed}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant={
                          profile.status === "running" ? "destructive" : "default"
                        }
                        onClick={() => handleToggleStatus(profile.id)}
                      >
                        {profile.status === "running" ? "Stop" : "Launch"}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteProfile(profile.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredProfiles.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No profiles found
              </h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
